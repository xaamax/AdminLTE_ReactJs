import React, { useEffect, useState } from "react";
import Content from "../../common/layouts/Content";
import ContentHeader from "../../common/layouts/ContentHeader";
import Tabs from "../../common/tab/Tabs";
import TabsHeader from "../../common/tab/TabsHeader";
import TabHeader from "../../common/tab/TabHeader";
import TabsContent from "../../common/tab/TabsContent";
import TabContent from "../../common/tab/TabContent";
import FormGroup from "../../common/form/FormGroup";
import { InputGroupAppend } from "../../common/form/controls/Input";
import Grid from "../../common/layouts/Grid";
import Row from "../../common/layouts/Row";

const tabsMenu = [
  { label: "Menu", icon: "th", target: "tabMenu", active: true },
  { label: "Usuário", icon: "user", target: "tabUsuario", active: false },
];

function Config() {
  const [tabActive, setTabActive] = useState();

  useEffect(() => {
    setTabActive("tabMenu");
  }, []);

  const handleTabSelect = (tab) =>
    tabsMenu.filter(({ target, active }) => {
      if (target === tab) active = !active;
      setTabActive(tab);
    });

  const TabMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleAccordion = () => {
      setIsExpanded(!isExpanded);
    };

    const [menuAtual, setMenuAtual] = useState([]);
    
    const menuData = {
      headers: JSON.parse(localStorage.getItem("menuData")).map(
        ({ key, header }) => ({ key, header })
      ),
      items: "",
    };

    useEffect(() => {
      preencherMenu(menuData);
    },[])
    
    const preencherMenu = (menu) => (
      setMenuAtual([menu])
    )

    const handleChangeMenu = (keyID, item) => {
      const novoMenu = menuAtual.map((obj) => ({
        ...obj,
        [item]: obj[item].filter(({ key }) => key !== keyID),
      }));
      setMenuAtual(novoMenu);
    };

    return (
      <div className="card card-gray" style={{ cursor: "pointer" }}>
        <div className="card-header" onClick={toggleAccordion}>
          <div className="d-flex justify-content-between">
            <div>
              <h3 className="card-title">Header</h3>
            </div>
            <div>
              <i
                className={`flot-right fas ${
                  isExpanded ? "fa-chevron-up" : "fa-chevron-down"
                }`}
              ></i>
            </div>
          </div>
        </div>
        {isExpanded && (
          <div className="card-body">
            <div className="accordion" id="accordionMenu">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    const ultimoKey =
                      menuAtual[0].headers[menuAtual[0].headers.length - 1].key;
                    const novoHeader = { key: ultimoKey + 1, header: "" };
                    setMenuAtual([
                      { headers: [...menuAtual[0].headers, novoHeader] },
                    ]);
                  }}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() =>  preencherMenu(menuData)}
                >
                  <i className="fas fa-redo-alt"></i>
                </button>
              </div>
              <hr />
              <Row>
                {menuAtual.map(({ headers }) =>
                  headers.map(({ key, header }) => (
                    <Grid key={key} cols="12 6">
                      <FormGroup>
                        <InputGroupAppend
                          label="Nome"
                          type="text"
                          placeholder="Informe o header"
                          inputClass="form-control-sm"
                          value={header}
                          append="btn"
                          icon="trash"
                          appendClass="btn-danger btn-sm"
                          onClick={() => handleChangeMenu(key, "headers")}
                        />
                      </FormGroup>
                    </Grid>
                  ))
                )}
              </Row>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TabUsuario = () => (
    <div className="card-header">
      <h3 className="card-title">::. Usuario .::</h3>
    </div>
  );

  return (
    <Content contentClass="container-fluid">
      <ContentHeader
        title="Configurações"
        subtitle="Personlizar MyApp"
        breadCrumbText
      />
      <Tabs>
        <TabsHeader>
          {tabsMenu.map(({ label, icon, target, active, visible }, key) => (
            <TabHeader
              key={key}
              label={label}
              icon={icon}
              target={target}
              active={active}
              visible={visible}
              handleTabSelect={handleTabSelect}
            />
          ))}
        </TabsHeader>
        <TabsContent>
          {tabsMenu.map(({ target, active }, key) => (
            <TabContent
              key={key}
              id={target}
              active={tabActive === target ?? false}
            >
              {tabActive === "tabMenu" && <TabMenu />}
              {tabActive === "tabUsuario" && <TabUsuario />}
            </TabContent>
          ))}
        </TabsContent>
      </Tabs>
    </Content>
  );
}

export default Config;
