import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemButtonProps,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { FC, useState } from "react";

interface ICollapsedListItemProps extends ListItemButtonProps {
  isOpenByDefault?: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  text: string;
}

export const CollapsedListItem: FC<ICollapsedListItemProps> = ({
  isOpenByDefault = false,
  icon,
  text,
  children,
  onClick,
  ...props
}) => {
  const [open, setOpen] = useState(isOpenByDefault);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpen(!open);

    if (onClick) onClick(e);
  };

  return (
    <>
      <ListItemButton {...props} onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};
