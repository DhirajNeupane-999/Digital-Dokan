import assert from "node:assert/strict";
import app from "../src/app";

const server = app.listen(0, async () => {
  const address = server.address();

  if (!address || typeof address === "string") {
    throw new Error("Could not determine server port");
  }

  const port = address.port;

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/payment/khalti/initiate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: 1000,
        purchase_order_id: "test-order-123",
        purchase_order_name: "Test Order",
      }),
    });

    const text = await response.text();
    console.log("Khalti route status:", response.status);
    console.log("Khalti route body:", text);

    assert.notEqual(response.status, 404, "Khalti initiate endpoint should exist");
  } catch (error) {
    console.error("Khalti test failed:", error);
    throw error;
  } finally {
    server.close();
  }
});
