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
import {
  menuDefault,
  appDefault,
  LogoDefault,
  Logo,
  bgColors,
} from "../../common/constants/index";
import Gravatar from "react-gravatar";
import { Table as TabelaHubs } from "../../common/layouts/Table";

import { appData, menuData } from "../../common/constants/index";

const tabsMenu = [
  { label: "Sistema", icon: "wrench", target: "tabSistema", active: true },
  { label: "Menus", icon: "bars", target: "tabMenu", active: false },
  { label: "Hubs", icon: "th", target: "tabHubs", active: false },
  { label: "Usuário", icon: "user", target: "tabUsuario", active: false },
];

function Config() {
  const [tabActive, setTabActive] = useState("tabSistema");

  const handleTabSelect = (tab) =>
    tabsMenu.filter(({ target, active }) => {
      if (target === tab) active = !active;
      return setTabActive(tab);
    });

  const TabMenu = () => {
    const [menuAtual, setMenuAtual] = useState(menuData());

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
                    {type === "icon" && (
                      <i className={`fas fa-${row["icon"]}`}></i>
                    )}
                    {type === "boolean" && JSON.stringify(row[key])}
                    {!type && row[key]}
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
                        setItem({ ...item, label: value });
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
                        setItem({ ...item, icon: value });
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
                        setItem({ ...item, route: value });
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
                        setItem({ ...item, order: value });
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
                          setItem({ ...item, visible: checked });
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
                          setItem({ ...item, style: value, route: "#" });
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
              className="btn btn-primary btn-sm"
              onClick={() => {
                const ultimoKey =
                  menuAtual.length > 0 ? menuAtual[menuAtual.length - 1].id : 0;
                const novoHeader = {
                  id: ultimoKey + 1,
                  items: [],
                };
                setMenuTabs({ ...menuTabs, active: "tab-header" });
                setMenuAtual([...menuAtual, novoHeader]);
              }}
            >
              <i className="fas fa-plus mr-2"></i>Novo
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setMenuAtual(menuDefault)}
            >
              <i className="fas fa-redo-alt mr-2"></i>Padrão
            </button>
          </div>
          <div className="btn-group">
            <button
              className="btn btn-success btn-sm"
              onClick={() => {
                localStorage.setItem("menuData", JSON.stringify(menuAtual));
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
            >
              <i className="fas fa-save mr-2"></i>Salvar
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
                localStorage.removeItem("menuData");
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
              disabled={!menuAtual.length}
            >
              <i className="fas fa-times mr-2"></i>Excluir todos
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
                cardclassName="card-secondary card-outline"
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
                                      <div className="custom-control custom-switch">
                                        <input
                                          type="checkbox"
                                          id="headerSwitch"
                                          className="custom-control-input"
                                          checked={header !== undefined}
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
                                        <label
                                          className="custom-control-label"
                                          htmlFor="headerSwitch"
                                        >
                                          Incluir Header
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
          <div className="col-lg-9 mb-3 p-4">
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
                    setUser({ ...user, nome: value });
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
                    setUser({ ...user, email: value });
                  }}
                />
              </Grid>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <div>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    localStorage.setItem("userData", JSON.stringify(user));
                    setTimeout(() => {
                      window.location.reload();
                    }, 100);
                  }}
                >
                  <i className="fas fa-save mr-2"></i>Salvar alterações
                </button>
              </div>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => setUser(initUser)}
                >
                  <i className="fas fa-eraser mr-2"></i>Limpar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TabSistema = () => {
    const [sistema, setSistema] = useState(appData());
    const [fileName, setFileName] = useState();

    const handleLogoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          // setPreviewLogo(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const optionsEstiloSistema = [
      { label: "Padrão", value: "default" },
      { label: "Personalizado", value: "custom" },
    ];

    return (
      <div>
        <Row>
          <Grid cols="12 8">
            <Row className="mt-2">
              <Grid cols="12 5">
                <label>Estilo</label>
                <div className="d-flex flex-wrap">
                  {optionsEstiloSistema.map(({ label, value }, index) => (
                    <div key={index} className="form-check mr-3 mb-2">
                      <input
                        type="radio"
                        className="form-check-input"
                        value={value}
                        checked={sistema.style === value}
                        style={{
                          cursor: "pointer",
                        }}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (value === "default") setSistema(appDefault);
                          else
                            setSistema({ ...sistema, name: "", style: value });
                        }}
                      />
                      <label className="form-check-label">{label}</label>
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid cols="12 7">
                <InputLabel
                  label="Nome da aplicação"
                  type="text"
                  placeholder="Informe o nome da aplicação"
                  value={sistema.name}
                  disabled={sistema.style === "default"}
                  onChange={(e) => {
                    const { value } = e.target;
                    setSistema({ ...sistema, name: value });
                  }}
                />
              </Grid>
              <Grid cols="12 5" classGrid=" mt-4">
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    id="darkModeSwitch"
                    className="custom-control-input"
                    checked={sistema.darkMode}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setSistema({ ...sistema, darkMode: checked });
                    }}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="darkModeSwitch"
                  >
                    Modo escuro
                  </label>
                </div>
              </Grid>
              <Grid cols="12 7" classGrid=" mt-2">
                <small>Formato png com fundo transparente (128 x 128px)</small>
                <div className="input-group">
                  <div className="custom-file">
                    <input
                      id="iconFile"
                      type="file"
                      className="custom-file-input"
                      onChange={handleLogoChange}
                    />
                    <label className="custom-file-label" htmlFor="iconFile">
                      {!fileName && (
                        <span>
                          <i className="fas fa-folder-open mr-2"></i>Escolha o
                          icone da aplicação
                        </span>
                      )}
                      {fileName && fileName}
                    </label>
                  </div>
                </div>
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    checked={sistema.logoCircle}
                    style={{ cursor: "pointer" }}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setSistema({ ...sistema, logoCircle: checked });
                    }}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Logo circular
                  </label>
                </div>
              </Grid>
            </Row>
          </Grid>
          <Grid cols="12 4" classGrid=" text-center mt-4">
            <h5>Logo da aplicação:</h5>
            <img
              src={sistema.style === "default" ? LogoDefault : Logo}
              alt="Preview"
              className={`img-thumbnail ${
                sistema.logoCircle ? "img-circle" : ""
              }`}
              style={{ maxWidth: "108px" }}
            />
          </Grid>
        </Row>
        <hr />
        <button
          className="btn btn-success"
          onClick={() => {
            localStorage.setItem("appData", JSON.stringify(sistema));
            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
        >
          <i className="fas fa-save mr-2"></i>Salvar configurações
        </button>
      </div>
    );
  };

  const TabHubs = () => {
    const hubsData = JSON.parse(localStorage.getItem("hubsData")) || [];
    const [hubs, setHubs] = useState(hubsData);

    const initHub = {
      name: "",
      icon: "",
      color: "bg-primary",
      order: 1,
      route: "",
    };
    const [hub, setHub] = useState(initHub);

    const fields = [
      { key: "id", text: "#" },
      { key: "name", text: "Nome" },
      { key: "icon", text: "Icone", type: "icon" },
      { key: "color", text: "Cor", type: "color" },
      { key: "route", text: "Rota" },
    ];

    const RowsTableHubs = () => {
      return hubs
        .sort((a, b) => a.order - b.order)
        .map((row, index) => (
          <tr key={index}>
            {fields.map(({ key, type }, index) => (
              <td key={index}>
                {type === "icon" && <i className={`fas fa-${row.icon}`}></i>}
                {type === "boolean" && JSON.stringify(row[key])}
                {type === "color" && (
                  <span className={`right badge ${row.color}`}>
                    {row.color}
                  </span>
                )}
                {!type && row[key]}
              </td>
            ))}
            <td className="align-middle">
              <div className="btn-group">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => {
                    setHub({ ...row });
                  }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    if (
                      window.confirm("Tem certeza que deseja remover o item?")
                    ) {
                      handleHub(row, "excluir");
                    }
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ));
    };

    const handleHub = (item, acao) => {
      const novosHubs = [...hubs];
      const hubIndex = novosHubs.findIndex(({ id }) => id === item.id);
      switch (acao) {
        case "editar":
          novosHubs.splice(hubIndex, 1, item);
          setHubs(novosHubs);
          break;
        case "excluir":
          novosHubs.splice(hubIndex, 1);
          setHubs(novosHubs);
          break;
        default:
          const hubID = hubs.length > 0 ? hubs[hubs.length - 1].id : 0;
          const novoHub = {
            id: hubID + 1,
            ...item,
          };
          setHubs([...novosHubs, novoHub]);
          break;
      }
      localStorage.setItem("hubsData", JSON.stringify(novosHubs));
      setHub(initHub);
    };

    return (
      <Grid>
        <Row>
          <Grid cols="12 3">
            <InputLabel
              inputClass="form-control-sm"
              label="Nome"
              type="text"
              placeholder="Informe o nome do Hub"
              value={hub.name}
              onChange={(e) => {
                const { value } = e.target;
                setHub({ ...hub, name: value });
              }}
            />
          </Grid>
          <Grid cols="12 3">
            <InputLabel
              inputClass="form-control-sm"
              label="Ícone"
              type="text"
              placeholder="Informe o ícone do Hub"
              value={hub.icon}
              onChange={(e) => {
                const { value } = e.target;
                setHub({ ...hub, icon: value });
              }}
            />
          </Grid>
          <Grid cols="12 3">
            <InputLabel
              inputClass="form-control-sm"
              label="Rota"
              type="text"
              placeholder="Informe a rota do Hub"
              value={hub.route}
              onChange={(e) => {
                const { value } = e.target;
                setHub({ ...hub, route: value });
              }}
            />
          </Grid>
          <Grid cols="12 2">
            <label>Cor</label>
            <select
              className={`form-control form-control-sm border-0 mb-3 ${hub.color}`}
              value={hub.color}
              onChange={(e) => {
                const { value } = e.target;
                setHub({ ...hub, color: value });
              }}
            >
              {bgColors.map(({ key, text }, index) => (
                <option key={index} className={key} value={key}>
                  {text}
                </option>
              ))}
            </select>
          </Grid>
          <Grid cols="12 1">
            <label>Ordem</label>
            <select
              className="form-control form-control-sm"
              value={hub.order}
              onChange={(e) => {
                const { value } = e.target;
                setHub({ ...hub, order: value });
              }}
            >
              <>
                {!hubs.length && <option value="1">1</option>}
                {hubs.length > 0 && (
                  <>
                    {hubs.map(({}, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </>
                )}
                <option value={hubs.length + 1}>{hubs.length + 1}</option>
              </>
            </select>
          </Grid>
        </Row>
        <Grid>
          <div className="btn-group">
            <button
              className="btn btn-sm btn-success"
              disabled={!hub.name || !hub.icon || !hub.route}
              onClick={() => handleHub(hub, hub.id ? "editar" : "inserir")}
            >
              <i className={`fas fa-${hub.id ? "check" : "plus"} mr-2`}></i>
              {hub.id ? "Salvar" : "Incluir"}
            </button>
            <button
              disabled={!hub.name}
              className="btn btn-sm btn-secondary"
              onClick={() => setHub(initHub)}
            >
              <i className="fas fa-eraser mr-2"></i>Limpar
            </button>
            <button
              disabled={!hubs.length}
              className="btn btn-sm btn-danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Tem certeza que deseja excluir todos os hubs?"
                  )
                )
                  localStorage.removeItem("hubsData");
                setHubs([]);
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
            >
              <i className="fas fa-times mr-2"></i>Excluir todos
            </button>
          </div>
        </Grid>
        <hr />
        <TabelaHubs {...{ fields }} rows={<RowsTableHubs />} />
      </Grid>
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
                {tabActive === "tabSistema" && <TabSistema />}
                {tabActive === "tabMenu" && <TabMenu />}
                {tabActive === "tabHubs" && <TabHubs />}
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
