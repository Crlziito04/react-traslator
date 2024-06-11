import { Form } from "react-bootstrap";
import { SectionType } from "../type.d";

type Props = {
  type: SectionType;
  loading?: undefined;
  value: string;
  onChange: (value: string) => void;
};

const getPlaceHolder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === SectionType.From) return "Introducir texto";
  if (loading === true) return "...Cargando";
  return "Traduccion";
};

export const TextArea: React.FC<Props> = ({
  type,
  loading,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const commonStyles = { height: "200px", border: 0 };

  const styles =
    type === SectionType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as="textarea"
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      value={value}
      disabled={type === SectionType.To}
      onChange={handleChange}
    />
  );
};
