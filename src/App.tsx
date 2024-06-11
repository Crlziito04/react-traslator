import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { ArrowIcon } from "./components/Icons";
import { AUTO_LANG } from "./constants";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./type.d";
import { TextArea } from "./components/TextArea";

function App() {
  const {
    fromLanguage,
    fromText,
    result,
    interchangeLang,
    toLanguage,
    setFromLang,
    setToLang,
    setFromText,
    setResult,
    loading,
  } = useStore();

  return (
    <Container fluid>
      <h1>Google Traslate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <h2>From</h2>
            <LanguageSelector
              type={SectionType.From}
              value={fromLanguage}
              onChange={setFromLang}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
              loading={loading}
            />
          </Stack>
        </Col>

        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANG}
            onClick={interchangeLang}
          >
            <ArrowIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <h2>To</h2>
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLang}
            />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
