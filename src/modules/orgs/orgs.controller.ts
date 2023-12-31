import { db } from "@/lib/db";
import { Hono } from "hono";

export const router = new Hono();

router
  .get("/", async (c) => {
    const orgs = await db.org.findMany({});
    return c.json(orgs);
  })
  .post("/", async (c) => {
    const { name, icon } = await c.req.json<{ name: string; icon: string }>();
    const orgs = await db.org.create({
      data: {
        name: name,
        icon: icon,
      },
    });
    return c.json(orgs);
  })
  .get("/:orgId/channels", (c) =>
    c.json([
      {
        id: "1",
        name: "Class 1",
        category: {
          id: 1,
          name: "Class",
        },
      },
      {
        id: "2",
        name: "Class 2",
        category: {
          id: 1,
          name: "Class",
        },
      },
      {
        id: "3",
        name: "Class 1",
        category: {
          id: 2,
          name: "Class Audio",
        },
      },
      {
        id: "4",
        name: "Class 2",
        category: {
          id: 2,
          name: "Class Audio",
        },
      },
    ])
  )
  .get("/:orgId/members", (c) =>
    c.json([
      {
        id: "001",
        displayName: "John Doe",
        username: "john_doe",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        memberSince: "2022-01-01",
        joinedDiscord: "2022-01-01",
        joinMethod: "Discord",
        roles: ["Admin"],
      },
    ])
  )
  .get("/:orgId/channels/:channelId/messages", (c) =>
    c.json([
      {
        id: 1,
        sender: {
          id: 1,
          name: "John Doe",
          avatar:
            "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        },
        createdAt: "2022-01-01T00:00:00.000Z",
        message: "Hey, how are you?",
      },
    ])
  )
  .get("/:orgId/channels/:channelId/members", (c) =>
    c.json([
      {
        id: 1,
        name: "John",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        roles: ["Admin", "F0"],
        backgroundColor: "#d40000",
        category: {
          id: 1,
          name: "Đà Nẵng",
        },
      },
      {
        id: 2,
        name: "Tin Nguyen",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        roles: ["Học viên"],
        backgroundColor: "#d40000",
        category: {
          id: 2,
          name: "Online",
        },
      },
      {
        id: 3,
        name: "Son Tran",
        avatar: "https://sukienvietsky.com/upload/news/son-tung-mtp-7359.jpeg",
        roles: ["Học viên"],
        backgroundColor: "#d40000",
        category: {
          id: 2,
          name: "Online",
        },
      },
    ])
  );
