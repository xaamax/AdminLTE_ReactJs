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
import { optionsEstiloMenu } from "../../common/constants/index";
import { menuDefault } from "../../common/constants/index";
import Gravatar from "react-gravatar";

const tabsMenu = [
  { label: "Menu", icon: "th", target: "tabMenu", active: true },
  { label: "Usuário", icon: "user", target: "tabUsuario", active: false },
];

function Config() {
  const [tabActive, setTabActive] = useState("tabMenu");

  const handleTabSelect = (tab) =>
    tabsMenu.filter(({ target, active }) => {
      if (target === tab) active = !active;
      return setTabActive(tab);
    });

  const TabMenu = () => {
    const menuInicial = JSON.parse(localStorage.getItem("menuData"));
    const [menuAtual, setMenuAtual] = useState(menuInicial);

    const handleInputChange = (menuId, field, value) => {
      const novoMenu = menuAtual.map((menu) => {
        if (menu.id === menuId) {
          return { ...menu, [field]: value.toUpperCase() };
        }
        return { ...menu };
      });
      setMenuAtual(novoMenu);
    };

    const [menuTabs, setMenuTabs] = useState({
      menuId: "",
      active: "",
    });

    const [tabsItensMenu, setTabItensMenu] = useState(
      menuAtual.map(({ id, items }) => ({
        menuId: id,
        tabs: [
          { key: "header", label: "Header", target: "tab-header" },
          { key: "items", label: "Itens", target: "tab-items" },
          ...(items.some((item) => item.style === "treeview")
            ? [
                {
                  key: "childrens",
                  label: "Childrens",
                  target: "tab-childrens",
                },
              ]
            : []),
        ],
      }))
    );

    useEffect(() => {
      const novasTabs = menuAtual.map(({ id, items }) => ({
        menuId: id,
        tabs: [
          { key: "header", label: "Header", target: "tab-header" },
          { key: "items", label: "Itens", target: "tab-items" },
          ...(items.some((item) => item.style === "treeview") &&
          !tabsItensMenu.some((tab) => tab.target === "tab-childrens")
            ? [
                {
                  key: "childrens",
                  label: "Childrens",
                  target: "tab-childrens",
                },
              ]
            : []),
          {
            key: "excluirMenu",
            label: "Excluir menu",
            target: "tab-excluir-menu",
          },
        ],
      }));

      setTabItensMenu(novasTabs);
    }, [menuAtual]);

    const TabelaMenu = ({ menuId, items }) => {
      const fields = [
        { key: "id", text: "#" },
        { key: "label", text: "Label" },
        { key: "icon", text: "Icone", type: "icon" },
        { key: "style", text: "Estilo" },
        { key: "route", text: "Rota" },
        { key: "visible", text: "Visível", type: "boolean" },
      ];

      const itemInit = {
        label: "",
        style: "link",
        icon: "",
        visible: true,
        order: 1,
        route: "",
        childrens: [],
      };

      const [item, setItem] = useState(itemInit);

      const handleChildrens = (menuId, itemId) => {
        const itemsChildrens = menuAtual.reduce((acc, cur) => {
          if (cur.id === menuId) {
            const menuItem = cur.items.find((menu) => menu.id === itemId);
            if (menuItem) {
              acc = menuItem.childrens;
            }
          }
          return acc;
        }, []);

        setItem((prevItem) => {
          if (itemId === 0) {
            const { belongTreeview, ...rest } = prevItem;
            return rest;
          } else {
            return {
              ...prevItem,
              childrens: itemsChildrens,
              belongTreeview: itemId,
            };
          }
        });
      };

      const handleItem = (menuId, itemData, acao) => {
        const idNovo = menuAtual
          .filter(({ id }) => id === menuId)
          .reduce((acc, { items }) => {
            return acc + items.length + 1;
          }, 0);

        const itemId = item.belongTreeview ?? itemData.id;

        const novoMenu = [...menuAtual];
        const menuIndex = novoMenu.findIndex(({ id }) => id === menuId);
        const itemIndex = novoMenu[menuIndex].items.findIndex(
          ({ id }) => id === itemId
        );
        const childIndex =
          menuTabs.active === "tab-childrens"
            ? novoMenu[menuIndex].items[itemIndex].childrens.findIndex(
                ({ id }) => id === itemData.id
              )
            : "";

        switch (acao) {
          case "editar":
            setMenuAtual(() => {
              if (item.belongTreeview) {
                const updatedChild = {
                  ...novoMenu[menuIndex].items[itemIndex].childrens[childIndex],
                  label: itemData.label,
                  icon: itemData.icon,
                  visible: itemData.visible,
                  order: itemData.order,
                  route: itemData.route,
                };

                novoMenu[menuIndex].items[itemIndex].childrens.splice(
                  childIndex,
                  1,
                  updatedChild
                );
              } else {
                novoMenu[menuIndex].items.splice(itemIndex, 1, item);
              }

              return novoMenu;
            });
            break;
          case "excluir":
            item.belongTreeview
              ? novoMenu[menuIndex].items[itemIndex].childrens.splice(
                  childIndex,
                  1
                )
              : novoMenu[menuIndex].items.splice(itemIndex, 1);
            setMenuAtual(novoMenu);
            break;
          default:
            setMenuAtual((prevMenu) =>
              prevMenu.map((menu) => {
                if (item.belongTreeview)
                  return {
                    ...menu,
                    items: menu.items.map((menuItems) => {
                      if (menuItems.id === itemId) {
                        const novoIdChild =
                          menuItems.childrens.length > 0
                            ? menuItems.childrens[
                                menuItems.childrens.length - 1
                              ].id
                            : 0;

                        const novoItem = {
                          id: novoIdChild + 1,
                          label: itemData.label,
                          icon: itemData.icon,
                          style: "link",
                          visible: itemData.visible,
                          order: itemData.order,
                          route: itemData.route,
                        };

                        return {
                          ...menuItems,
                          childrens: [...menuItems.childrens, novoItem],
                        };
                      }
                      return menuItems;
                    }),
                  };
                else
                  return menu.id === menuId
                    ? {
                        ...menu,
                        items: [...menu.items, { id: idNovo, ...itemData }],
                      }
                    : menu;
              })
            );
            break;
        }
      };

      const RowsTable = () => {
        let rows = menuTabs.active === "tab-childrens" ? item.childrens : items;

        return (
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                {fields.map(({ key, type }, index) => (
                  <td key={index}>
                    {!type && row[key]}
                    {type === "icon" && (
                      <i className={`fas fa-${row["icon"]}`}></i>
                    )}
                    {type === "boolean" && JSON.stringify(row[key])}
                  </td>
                ))}
                <td className="align-middle">
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => {
                        setItem((prevsItem) => {
                          const { belongTreeview, childrens } = prevsItem;
                          return belongTreeview
                            ? { ...row, childrens, belongTreeview }
                            : { ...row };
                        });
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Tem certeza que deseja remover o item?"
                          )
                        ) {
                          handleItem(menuId, row, "excluir");
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        );
      };

      return (
        <div>
          {menuTabs.active === "tab-childrens" && (
            <FormGroup>
              <label>Item</label>
              <select
                className="form-control form-control-sm"
                value={item.belongTreeview || ""}
                onChange={(e) => {
                  const { value } = e.target;
                  handleChildrens(menuId, +value);
                }}
              >
                <option value="">-- Selecione --</option>
                {menuAtual
                  .filter(({ id }) => id === menuId)
                  .map((menu) =>
                    menu.items
                      .filter(({ style }) => style === "treeview")
                      .map(({ label, id }, i) => (
                        <option key={i} value={+id}>
                          {label}
                        </option>
                      ))
                  )}
              </select>
            </FormGroup>
          )}
          {(menuTabs.active === "tab-items" ||
            menuTabs.active === "tab-childrens") && (
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
                        setItem((item) => ({ ...item, label: value }));
                      }}
                    />
                  </Grid>
                  <Grid cols="12 6">
                    <InputLabel
                      label="Icone"
                      type="text"
                      inputClass="form-control-sm"
                      placeholder="Informe o icone"
                      value={item.icon}
                      onChange={(e) => {
                        const { value } = e.target;
                        setItem((item) => {
                          return { ...item, icon: value };
                        });
                      }}
                    />
                  </Grid>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Grid cols="12 6">
                    <InputLabel
                      label="Rota"
                      type="text"
                      inputClass="form-control-sm"
                      placeholder="Informe a rota"
                      disabled={item.style === "treeview"}
                      value={item.route || ""}
                      onChange={(e) => {
                        const { value } = e.target;
                        setItem((item) => {
                          return { ...item, route: value };
                        });
                      }}
                    />
                  </Grid>
                  <Grid cols="12 3">
                    <label>Ordem</label>
                    <select
                      className="form-control form-control-sm"
                      value={item.order}
                      onChange={(e) => {
                        const { value } = e.target;
                        setItem((prevsItem) => ({
                          ...prevsItem,
                          order: value,
                        }));
                      }}
                    >
                      {items.length === 0 && <option value={1}>1</option>}
                      {items.length > 0 && (
                        <React.Fragment>
                          {items.map((itemOrder, index) => (
                            <option key={index} value={index + 1}>
                              {index + 1}
                            </option>
                          ))}
                        </React.Fragment>
                      )}
                    </select>
                  </Grid>
                  <Grid cols="12 3">
                    <div className="form-check ml-2 mt-4">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        style={{ cursor: "pointer" }}
                        checked={item.visible}
                        onChange={(e) => {
                          const { checked } = e.target;
                          setItem((prevItem) => ({
                            ...prevItem,
                            visible: checked,
                          }));
                        }}
                      />
                      <label className="font-weight-bold">Visível</label>
                    </div>
                  </Grid>
                </Row>
              </FormGroup>
            </div>
          )}
          <div className="d-flex flex-wrap">
            {menuTabs.active === "tab-items" && (
              <div>
                <label>Estilo</label>
                <div className="d-flex flex-wrap">
                  {optionsEstiloMenu.map(({ label, value }, index) => (
                    <div key={index} className="form-check mr-3 mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        value={value}
                        checked={item.style === value}
                        style={{
                          cursor: "pointer",
                        }}
                        onChange={(e) => {
                          const { value } = e.target;
                          setItem((item) => {
                            return { ...item, style: value, route: "#" };
                          });
                        }}
                      />
                      <label className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {(menuTabs.active === "tab-items" ||
              menuTabs.active === "tab-childrens") && (
              <div className="ml-auto mt-4">
                <div className="btn-group">
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() =>
                      handleItem(menuId, item, item.id ? "editar" : "incluir")
                    }
                    disabled={!item.label || !item.icon}
                  >
                    <i
                      className={`fas fa-${item.id ? "save" : "plus"} mr-2`}
                    ></i>
                    {item.id ? "Salvar" : "Incluir"}
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setItem(itemInit)}
                    disabled={!item.label && !item.icon}
                  >
                    <i className="fas fa-eraser mr-2"></i>Limpar
                  </button>
                </div>
              </div>
            )}
          </div>
          {((menuTabs.active === "tab-items" && items.length > 0) ||
            (menuTabs.active === "tab-childrens" &&
              item.childrens.length > 0)) && (
            <>
              <hr />
              <table className="table table-striped table-bordered text-center">
                <thead className="table-header bg-secondary">
                  <tr>
                    {fields.map(({ text }, index) => (
                      <th key={index}>{text}</th>
                    ))}
                    <th>Ação</th>
                  </tr>
                </thead>
                <RowsTable />
              </table>
            </>
          )}
        </div>
      );
    };

    return (
      <div>
        <div className="d-flex justify-content-between">
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-info btn-sm"
              onClick={() => {
                const ultimoKey =
                  menuAtual.length > 0 ? menuAtual[menuAtual.length - 1].id : 0;
                const novoHeader = {
                  id: ultimoKey + 1,
                  header: "",
                  items: [],
                };
                setMenuTabs((prevsMenuTabs) => ({
                  ...prevsMenuTabs,
                  active: "tab-header",
                }));
                setMenuAtual([...menuAtual, novoHeader]);
              }}
            >
              <i className="fas fa-plus mr-2"></i>Incluir menu
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setMenuAtual(menuDefault)}
            >
              <i className="fas fa-redo-alt mr-2"></i>Restaurar padrão
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Tem certeza que deseja excluir todos os menus?"
                  )
                )
                  setMenuAtual([]);
              }}
              disabled={!menuAtual.length}
            >
              <i className="fas fa-times mr-2"></i>Excluir menus
            </button>
          </div>
          <div>
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                localStorage.setItem("menuData", JSON.stringify(menuAtual));
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              <i className="fas fa-save mr-2"></i>Salvar configurações
            </button>
          </div>
        </div>
        <hr />
        <Accordion>
          {menuAtual.map(({ id, header, items }, index) => (
            <AccordionItem
              key={id}
              title={`Menu ${index + 1}`}
              onClickAccordionItem={() => {
                setMenuTabs(({ menuId, active }) => ({
                  menuId: id,
                  active: menuId === id ? active : "tab-header",
                }));
              }}
            >
              <Card
                cardClass="card-secondary card-outline"
                header="Definições"
                icon="cog"
              >
                <Row>
                  <Grid cols="12 5 3">
                    <div
                      className="nav flex-column nav-tabs"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      {tabsItensMenu
                        .filter(({ menuId }) => menuId === id)
                        .map(({ tabs }) =>
                          tabs.map(({ target, label }, i) => (
                            <div key={i}>
                              <a
                                className={`nav-link ${
                                  menuTabs.active === target ? "active" : ""
                                }`}
                                data-toggle="pill"
                                href={`#${target}`}
                                role="tab"
                                aria-selected="true"
                                onClick={() => {
                                  setMenuTabs((prev) => ({
                                    ...prev,
                                    active: target,
                                  }));
                                }}
                              >
                                {label}
                              </a>
                            </div>
                          ))
                        )}
                    </div>
                  </Grid>
                  <Grid cols="12 7 9">
                    {tabsItensMenu
                      .filter(({ menuId }) => menuId === id)
                      .map(({ tabs }) =>
                        tabs.map(({ target }, i) => (
                          <div key={i} className="tab-content" id={target}>
                            <div
                              className={`tab-pane p-2 text-left fade ${
                                target === menuTabs.active ? "show active" : ""
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
                                                  const { id } = menu;
                                                  return {
                                                    id,
                                                    header: "",
                                                    ...menu,
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
                              <Row>
                                <Grid cols="12 12">
                                  <TabelaMenu {...{ menuId: id, items }} />
                                </Grid>
                              </Row>
                              {target === "tab-excluir-menu" && (
                                <div className="d-flex flex-column align-items-center text-center">
                                  <p>
                                    Tem certeza que deseja exluir todo conteúdo
                                    desse menu?
                                  </p>
                                  <button
                                    className="btn btn-danger mt-2"
                                    onClick={() => {
                                      const exluirMenu = menuAtual.filter(
                                        (menu) => menu.id !== id
                                      );
                                      setMenuAtual(exluirMenu);
                                    }}
                                  >
                                    <i className="fas fa-times mr-2"></i>Excluir
                                    menu
                                  </button>
                                </div>
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

  const TabUsuario = () => {
    const initUser = {
      email: "",
      nome: "",
    };

    const [user, setUser] = useState(
      JSON.parse(localStorage.getItem("userData"))
    );

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-1 mb-3">
            <div className="card mb-3">
              <div className="card-header bg-light"></div>
              <div className="d-flex align-self-center pt-3">
                <Gravatar
                  email={user.email}
                  className="img-circle elevation-2"
                  width="100"
                  height="100"
                />
              </div>
              <div className="card-body">
                <div className="h4 fw-bold text-center"></div>
                <div>
                  <small className="p-1">
                    <strong>Nome: </strong>
                    {user.nome}
                  </small>
                  <br />
                  <small className="p-1">
                    <strong>E-mail: </strong>
                    {user.email}
                  </small>
                </div>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-lg-9 mb-3">
            <div className="row">
              <div className="col-12">
                <h4 className="border-bottom">Dados</h4>
              </div>
              <Grid cols="12 6">
                <InputLabel
                  label="Nome"
                  type="text"
                  placeholder="Informe o nome"
                  value={user.nome}
                  onChange={(e) => {
                    const { value } = e.target;
                    setUser((prevUser) => ({ ...prevUser, nome: value }));
                  }}
                />
              </Grid>
              <Grid cols="12 6">
                <InputLabel
                  label="E-mail"
                  type="email"
                  placeholder="Informe o e-mail"
                  value={user.email}
                  onChange={(e) => {
                    const { value } = e.target;
                    setUser((prevUser) => ({ ...prevUser, email: value }));
                  }}
                />
              </Grid>
            </div><hr />
            <div className="d-flex justify-content-between">
            <div>
            <button className="btn btn-success" onClick={() => {
              localStorage.setItem("userData", JSON.stringify(user))
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}><i className="fas fa-save mr-2"></i>Salvar alterações</button>
            </div>
            <div>
            <button className="btn btn-danger" onClick={() => setUser(initUser)}><i className="fas fa-eraser mr-2"></i>Limpar</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Content contentClass="container-fluid">
      <ContentHeader
        title="Configurações"
        subtitle="Personlizar MyApp"
        breadCrumbText
      />
      <div className="p-2">
        <Tabs>
          <TabsHeader>
            {tabsMenu.map(({ label, icon, target, active, visible }, key) => (
              <TabHeader
                key={key}
                {...{ label, icon, target, active, visible }}
                handleTabSelect={handleTabSelect}
              />
            ))}
          </TabsHeader>
          <TabsContent>
            {tabsMenu.map(({ target }, key) => (
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
      </div>
    </Content>
  );
}

export default Config;
