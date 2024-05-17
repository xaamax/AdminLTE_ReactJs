import { useState } from "react";

export const Accordion = ({ children }) => {
  return (
    <div className="accordion" id="accordionMenu">
      <div className="card">
      {children}
      </div>
    </div>
  );
};

export const AccordionItem = ({ title, children, onClickAccordionItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
    onClickAccordionItem();
  };

  return (
    <div className='card-secondary'>
      <div className="card-header" style={{ cursor: 'pointer'}} onClick={toggleAccordion}>
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="card-title">{title}</h3>
          </div>
          <div>
            <i
              className={`fas ${
                isExpanded ? "fa-chevron-up" : "fa-chevron-down"
              }`}
            ></i>
          </div>
        </div>
      </div>
      {isExpanded && <div className="card-body">{children}</div>}
    </div>
  );
};
