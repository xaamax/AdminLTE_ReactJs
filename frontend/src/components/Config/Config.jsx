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
      const fields = items
        .filter((field) => field !== "childrens")
        .map((item) => {
          const { id, label, style, icon } = item;
          return {
            ["#"]: id,
            label,
            style,
            icon,
            actions: "",
          };
        });

      const [item, setItem] = useState({
        label: "",
        style: "link",
        icon: "",
        childrens: [],
      });

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
          <>
            {rows.map((row, index) => (
              <tr key={index}>
                {Object.keys(items[0])
                  .filter((field) => field !== "childrens")
                  .map((field, index) => (
                    <td key={index}>{row[field]}</td>
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
          </>
        );
      };

      return (
        <div>
          <FormGroup>
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
                    }}
                  />
                </Grid>
              </Row>
            )}
          </FormGroup>
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
                            return { ...item, style: value };
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
                    onClick={() =>
                      setItem({
                        label: "",
                        style: "link",
                        icon: "",
                        childrens: [],
                      })
                    }
                    disabled={!item.label && !item.icon}
                  >
                    <i className="fas fa-eraser mr-2"></i>Limpar
                  </button>
                </div>
              </div>
            )}
          </div>
          {(menuTabs.active === "tab-items" && items.length > 0 ||
            (menuTabs.active === "tab-childrens" &&
              item.childrens.length > 0)) && (
            <>
              <hr />
              <table className="table table-striped table-bordered text-center">
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
                  <RowsTable />
                </tbody>
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
                setMenuTabs((prevsMenuTabs) => ({...prevsMenuTabs, active: "tab-header" }))
                setMenuAtual([...menuAtual, novoHeader]);
              }}
            >
              <i className="fas fa-plus mr-2"></i>Incluir menu
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setMenuAtual([])
                setMenuAtual(menuDefault);
              }}
            >
              <i className="fas fa-redo-alt mr-2"></i>Restaurar padrão
            </button>
          </div>
          <div>
            <button className="btn btn-primary btn-sm" onClick={() => {
              localStorage.setItem("menuData", JSON.stringify(menuAtual));
              setTimeout(() => {
                  window.location.reload();
              }, 1000);
            }}><i className="fas fa-save mr-2"></i>Salvar menu</button>
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
