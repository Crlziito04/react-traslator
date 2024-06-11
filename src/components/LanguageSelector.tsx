import { Form } from "react-bootstrap";
import { AUTO_LANG, SUPPORTED_LANG } from "../constants";
import { Language, SectionType, fromLanguage } from "../type.d";

type Props =
  | {
      type: SectionType.From;
      value: fromLanguage;
      onChange: (language: fromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (language: Language) => void;
    };

export const LanguageSelector: React.FC<Props> = ({
  onChange,
  value,
  type,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANG}>Detectar Idioma</option>
      )}
      {Object.entries(SUPPORTED_LANG).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
};
