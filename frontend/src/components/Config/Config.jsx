import React, { useEffect, useState } from "react";
import Content from "../../common/layouts/Content";
import ContentHeader from "../../common/layouts/ContentHeader";
import Tabs from "../../common/tab/Tabs";
import TabsHeader from "../../common/tab/TabsHeader";
import TabHeader from "../../common/tab/TabHeader";
import TabsContent from "../../common/tab/TabsContent";
import TabContent from "../../common/tab/TabContent";
import Grid from "../../common/layouts/Grid";
import Row from "../../common/layouts/Row";
import { Accordion, AccordionItem } from "../../common/layouts/Accordion";
import Card from "../../common/layouts/Card";
import { InputLabel } from "../../common/form/controls/Input";
import FormGroup from "../../common/form/FormGroup";

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
    const menuInicial = JSON.parse(localStorage.getItem("menuData"));
    const [menuAtual, setMenuAtual] = useState(menuInicial);

    const handleInputChange = (menuId, field, value) => {
      const novoMenu = menuAtual.map((menu) => {
        if (menu.id === menuId) {
          return { ...menu, [field]: value };
        }
        return { ...menu };
      });
      setMenuAtual(novoMenu);
    };

    const [estiloMenu, setEstiloMenu] = useState(
      menuAtual.map(({ id }) => ({
        menuId: id,
        checked: "item",
        options: [{ label: "Item" }, { label: "Treeview" }],
        tabActive: "tab-header",
        tabs: [
          { key: "header", label: "Header", target: "tab-header" },
          { key: "items", label: "Itens", target: "tab-items" },
        ],
      }))
    );

    useEffect(() => {
      const alterarEstiloMenu = estiloMenu.map((checkbox) => {
        const menu = menuAtual.find(({ id }) => id === checkbox.menuId);
        const hasChildrens = menu.items.some((item) => item.childrens);
        if (hasChildrens) {
          return {
            ...checkbox,
            checked: "treeview",
            tabs: [
              ...checkbox.tabs,
              { key: "childrens", label: "Childrens", target: "tab-childrens" },
            ],
          };
        }
        return checkbox;
      });

      setEstiloMenu(alterarEstiloMenu);
    }, [menuAtual]);

    const handleAlterarEstiloMenu = (menuId, value) => {
      setEstiloMenu((prevEstiloMenu) =>
        prevEstiloMenu.map((checkbox) => {
          if (checkbox.menuId === menuId) {
            return {
              ...checkbox,
              checked: value,
              tabs:
                value === "treeview"
                  ? [
                      ...checkbox.tabs.filter((tab) => tab.key !== "childrens"),
                      {
                        key: "childrens",
                        label: "Childrens",
                        target: "tab-childrens",
                      },
                    ]
                  : checkbox.tabs.filter((tab) => tab.key !== "childrens"),
            };
          }
          return checkbox;
        })
      );
    };

    const TabelaMenu = ({ menuId, items }) => {
      const fields = items
        .filter((field) => field !== "childrens")
        .map((item) => {
          const { label, icon } = item;
          return {
            ["#"]: item.id,
            label,
            icon,
            actions: "",
          };
        });

      const [item, setItem] = useState({
        // id:
        //   menuAtual
        //     .filter(({ id }) => id === menuId)
        //     .reduce((acc, { items }) => {
        //       return acc + items.length + 1;
        //     }, 0),
        label: "",
        icon: "",
      });

      const handleItem = (menuId, item) => {
        const { id } = item;
      };

      return (
        <div>
          <FormGroup>
            <Row>
              <Grid cols="12 6">
                <InputLabel
                  label="Label"
                  type="text"
                  inputClass="form-control-sm"
                  placeholder="Informe o label"
                  value={item.label}
                  onChange={(e) => {
                    const { value } = e.target;
                    setItem((item) => {
                      return { ...item, label: value };
                    });
                    // handleInputChange(menuId, "items.label", value);
                  }}
                />
              </Grid>
              <Grid cols="12 6">
                <InputLabel
                  label="Icon"
                  type="text"
                  inputClass="form-control-sm"
                  placeholder="Informe o icon"
                  value={item.icon}
                  onChange={(e) => {
                    const { value } = e.target;
                    setItem((item) => {
                      return { ...item, icon: value };
                    });
                    // handleInputChange(menuId, "items.icon", value);
                  }}
                />
              </Grid>
            </Row>
          </FormGroup>
          <div className="d-flex flex-wrap">
            <div>
              <label>Estilo do menu</label>
              <div className="d-flex flex-wrap">
                {estiloMenu
                  .filter(menu => menu.menuId === menuId)
                  .map(({ options, checked }) => (
                    <React.Fragment key={menuId}>
                      {options.map(({ label }, index) => (
                        <div key={index} className="form-check mr-3 mb-2">
                          <input
                            type="radio"
                            className="form-check-input"
                            value={label.toLowerCase()}
                            checked={checked === label.toLowerCase()}
                            style={{
                              cursor: "pointer",
                            }}
                            onChange={(e) => {
                              const { value } = e.target;
                              setEstiloMenu((checkbox) =>
                                checkbox.map((cb) =>
                                  cb.menuId === menuId
                                    ? {
                                        ...cb,
                                        checked: value,
                                      }
                                    : cb
                                )
                              );
                              handleAlterarEstiloMenu(menuId, value);
                            }}
                          />
                          <label className="form-check-label">{label}</label>
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
              </div>
            </div>
            <div className="ml-auto mt-4">
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-plus mr-2"></i>Incluir item
              </button>
            </div>
          </div>
          <hr />
          <table className="table table-striped table-bordered">
            <thead className="table-header bg-secondary">
              <tr>
                {Object.keys(fields[0])
                  .filter((field) => field !== "childrens")
                  .map((field, index) => (
                    <th key={index}>{field}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  {Object.keys(items[0])
                    .filter((field) => field !== "childrens")
                    .map((field, index) => (
                      <td key={index}>{item[field]}</td>
                    ))}
                  <td className="text-center align-middle">
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setItem(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn-sm btn-danger">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    return (
      <div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-info btn-sm"
            onClick={() => {
              const ultimoKey = menuAtual[menuAtual.length - 1].id;
              const novoHeader = {
                id: ultimoKey + 1,
                header: "",
                items: [],
              };
              setMenuAtual([...menuAtual, novoHeader]);
            }}
          >
            <i className="fas fa-plus mr-2"></i>Incluir menu
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setMenuAtual(menuInicial)}
          >
            <i className="fas fa-redo-alt mr-2"></i>Redefinir
          </button>
        </div>
        <hr />
        <div>{JSON.stringify(menuAtual)}</div>
        <Accordion>
          {menuAtual.map(({ id, header, items }) => (
            <AccordionItem key={id} title={`Menu ${id}`}>
              <Card
                cardClass="card-primary card-outline"
                header="Editar"
                icon="edit"
              >
                <Row>
                  <Grid cols="12 5 3">
                    <div
                      className="nav flex-column nav-tabs"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {estiloMenu
                        .filter(({ menuId }) => menuId === id)
                        .map(({ tabActive, tabs }) =>
                          tabs.map(({ label, target }, index) => {
                            return (
                              <React.Fragment key={index}>
                                <a
                                  className={`nav-link ${
                                    tabActive === target ? "active" : ""
                                  }`}
                                  data-toggle="pill"
                                  href={`#${target}`}
                                  role="tab"
                                  aria-selected="true"
                                  onClick={() => {
                                    setEstiloMenu((prevTabs) =>
                                      prevTabs.map((tabs) => {
                                        return { ...tabs, tabActive: target };
                                      })
                                    );
                                  }}
                                >
                                  {label}
                                </a>
                              </React.Fragment>
                            );
                          })
                        )}
                    </div>
                  </Grid>
                  <Grid cols="12 7 9">
                    {estiloMenu
                      .filter(({ menuId }) => menuId === id)
                      .map(({ tabActive, tabs }) =>
                        tabs.map(({ target }, i) => (
                          <div key={i} className="tab-content" id={target}>
                            <div
                              className={`tab-pane p-2 text-left fade ${
                                target === tabActive ? "show active" : ""
                              }`}
                              id={target}
                              role="tabpanel"
                              aria-labelledby="vert-tabs-home-tab"
                            >
                              {target === "tab-header" && (
                                <div>
                                  <Row>
                                    <Grid>
                                      <div className="form-check">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          checked={header !== undefined}
                                          style={{ cursor: "pointer" }}
                                          onChange={(e) => {
                                            const { checked } = e.target;
                                            setMenuAtual((prevMenus) =>
                                              prevMenus.map((menu) => {
                                                if (
                                                  menu.id === id &&
                                                  !checked
                                                ) {
                                                  const { header, ...rest } =
                                                    menu;
                                                  return rest;
                                                } else {
                                                  return {
                                                    ...menu,
                                                    header: "",
                                                  };
                                                }
                                              })
                                            );
                                          }}
                                        />
                                        <label className="form-check-label">
                                          Incluir header no menu?
                                        </label>
                                      </div>
                                    </Grid>
                                  </Row>
                                  {header !== undefined && (
                                    <div>
                                      <hr />
                                      <Row>
                                        <Grid cols="12 2">
                                          <label className="col-form-label">
                                            Header
                                          </label>
                                        </Grid>
                                        <Grid cols="12 10">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Informe o header"
                                            value={header}
                                            onChange={(e) =>
                                              handleInputChange(
                                                id,
                                                "header",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Row>
                                    </div>
                                  )}
                                </div>
                              )}
                              {target === "tab-items" && (
                                <Row>
                                  <Grid cols="12 12">
                                    <TabelaMenu {...{ menuId: id, items }} />
                                  </Grid>
                                </Row>
                              )}
                              {tabActive === "tab-childrens" && (
                                <Row>
                                  <Grid cols="12 12">
                                    <table className="table table-striped table-bordered">
                                      <thead className="table-header bg-secondary">
                                        <tr>
                                          {Object.keys(items[0])
                                            .filter(
                                              (field) => field !== "childrens"
                                            )
                                            .map((field, index) => (
                                              <th key={index}>
                                                {field.toUpperCase()}
                                              </th>
                                            ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {items[0].childrens && (
                                          <React.Fragment>
                                            {items[0].childrens.map(
                                              (item, index) => (
                                                <tr key={index}>
                                                  {Object.keys(item).map(
                                                    (field, index) => (
                                                      <td key={index}>
                                                        {item[field]}
                                                      </td>
                                                    )
                                                  )}
                                                </tr>
                                              )
                                            )}
                                          </React.Fragment>
                                        )}
                                      </tbody>
                                    </table>
                                  </Grid>
                                </Row>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                  </Grid>
                </Row>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
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
