//@ts-nocheck

import { NextResponse } from 'next/server';
import translate from 'google-translate-api-x';

export async function POST(req: Request) {
  const { text, targetLanguage } = await req.json();

  if (!text || !targetLanguage) {
    return NextResponse.json({ error: 'Missing text or target language parameter' }, { status: 400 });
  }

  try {
    const translation = await translate(text, { to: targetLanguage });
    return NextResponse.json({ translation: translation.text }); // Return only the translated text
  } catch (error) {
    return NextResponse.json({ error: 'Error during translation' }, { status: 500 });
  }
}

