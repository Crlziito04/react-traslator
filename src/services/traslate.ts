import { SUPPORTED_LANG } from "../constants";
import { Language, fromLanguage } from "../type.d";

import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";
const apiKey = process.env.OPENAI_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: fromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  const msg = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        "You are a AI that translate text. You receive a text from the user. Do not answer, just translate the text. The original Language is surrounded by `{{`and`}}`. You can also receive {{auto}} wich means that you have to detect the language. You can translate to any language. The language you translate to is surrounded by ``[[`and`]].",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "Hola Mundo {{Español}} [[English]]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Hello world",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "How are you? {{auto}} [[Deutsch]]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Wie geht es dir?",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "Bon dia, com estas? {{auto}} [[Español]]",
    },
  ];

  const fromCode =
    fromLanguage === "auto" ? "auto" : SUPPORTED_LANG[fromLanguage];

  const toCode = SUPPORTED_LANG[toLanguage];

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...msg,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `$${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  });

  return completion.data.choices[0]?.message?.content;
}
