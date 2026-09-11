import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  audience?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const audience = (body.audience || "").trim();
  const message = (body.message || "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Please include a short message (at least 10 characters)." },
      { status: 400 },
    );
  }

  // v1: validate and acknowledge. No outbound email provider wired yet.
  console.info("[contact]", {
    name,
    email,
    phone: phone || null,
    audience: audience || null,
    messageLength: message.length,
  });

  return NextResponse.json({ ok: true });
}
