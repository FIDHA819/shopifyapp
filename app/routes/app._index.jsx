import { Form, useActionData } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { connectDB } from "../mongodb.server";
import Announcement from "../models/Announcement";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};
export const action = async ({ request }) => {
  try {
    console.log("START ACTION");

    const authResult = await authenticate.admin(request);

    console.log("AUTH RESULT:", Object.keys(authResult));

    const { admin } = authResult;

    console.log("ADMIN EXISTS:", !!admin);

    const formData = await request.formData();
    const announcement = formData.get("announcement");

    await connectDB();

    const saved = await Announcement.create({
      text: announcement,
    });

    console.log("Mongo Saved:", saved);

    console.log("BEFORE SHOP QUERY");

    const shopResponse = await admin.graphql(`
      {
        shop {
          id
          name
        }
      }
    `);

    console.log("AFTER SHOP QUERY");

    const shopData = await shopResponse.json();

    console.log("SHOP DATA:", shopData);
    const shopId = shopData.data.shop.id;

await admin.graphql(`
mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields {
      id
      key
      value
    }
    userErrors {
      field
      message
    }
  }
}
`, {
  variables: {
    metafields: [
      {
        namespace: "my_app",
        key: "announcement",
        type: "single_line_text_field",
        value: announcement,
        ownerId: shopId,
      },
    ],
  },
});

    return { success: true };

  } catch (error) {
    console.error("ERROR:");
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};
export default function Index() {
  const data = useActionData();

  return (
    <s-page heading="Announcement Banner App">
      <s-section heading="Create Announcement">

        <Form method="post">

          <input
            type="text"
            name="announcement"
            placeholder="Enter announcement text"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button type="submit">
            Save
          </button>

        </Form>

        {data?.success && (
          <p>Announcement Saved Successfully</p>
        )}

      </s-section>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};