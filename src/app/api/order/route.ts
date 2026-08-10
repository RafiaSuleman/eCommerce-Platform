import { NextResponse } from "next/server";
import { client } from "@/lib/sanity";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const query = `*[_type == "order"] | order(orderDate desc) {
      _id,
      customerName,
      customerEmail,
      products[]{
        name,
        price,
        quantity
      },
      totalAmount,
      paymentStatus,
      orderStatus,
      orderDate
    }`;

    const orders = await client.fetch(query);

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    if (!sessionId) {
      return NextResponse.json(
        { message: "Stripe session ID is required" },
        { status: 400 }
      );
    }

    // Stripe se successful checkout session fetch karna
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Sirf paid order Sanity me save hoga
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { message: "Payment is not completed" },
        { status: 400 }
      );
    }

    // Same Stripe session ka duplicate order save hone se rokna
    const existingOrder = await client.fetch(
      `*[_type == "order" && stripeSessionId == $sessionId][0]`,
      { sessionId }
    );

    if (existingOrder) {
      return NextResponse.json({
        message: "Order already exists",
        order: existingOrder,
      });
    }

    const products =
  session.line_items?.data.map((item) => ({
    _key: crypto.randomUUID(),

    name: item.description || "Product",

    price: (item.price?.unit_amount || 0) / 100,

    quantity: item.quantity || 1,
  })) || [];

   const order = await client.createIfNotExists({
  _id: `order-${session.id}`,
      _type: "order",

      customerName:
        session.customer_details?.name || "Guest Customer",

      customerEmail:
        session.customer_details?.email || "No email provided",

      products,

      totalAmount:
        (session.amount_total || 0) / 100,

      paymentStatus: "Paid",

      orderStatus: "pending",

      orderDate: new Date().toISOString(),

      stripeSessionId: session.id,
    });

    return NextResponse.json(
      {
        message: "Order saved successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving order:", error);

    return NextResponse.json(
      { message: "Failed to save order" },
      { status: 500 }
    );
  }
}