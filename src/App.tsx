import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Form, Stack } from "react-bootstrap";
import { ArrowIcon } from "./components/Icons";
import { AUTO_LANG } from "./constants";
import { LanguageSelector } from "./components/LanguageSelector";
import { SectionType } from "./type.d";

function App() {
  const { fromLanguage, interchangeLang, toLanguage, setFromLang, setToLang } =
    useStore();

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
            <Form.Control
              as="textarea"
              placeholder="Introducir Texto"
              autoFocus
              style={{ height: "150px" }}
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
            <Form.Control
              as="textarea"
              placeholder="Traduccion"
              style={{ height: "150px" }}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
