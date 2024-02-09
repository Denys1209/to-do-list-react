import React from "react";
import "../App.css";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function SideBar(props) {
  const [open, setOpen] = React.useState(0);
  const { onWidgetChange } = props;
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("all-deals")}>
                    Deals
                  </button>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("today-deals")}>
                    Today deals
                  </button>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("week-deals")}>
                    Week deals
                  </button>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("month-deals")}>
                    month deals
                  </button>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("all-projects")}>
                    Projects
                  </button>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("create-new-project")}>
                    Create a new project
                  </button>
                </div>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <div>
                  <button onClick={() => onWidgetChange("create-new-deal")}>
                    Create a new deal
                  </button>
                </div>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        {/* ... other accordions ... */}
      </List>
    </Card>
  );
}
