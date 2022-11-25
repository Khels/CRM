import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { StarBorder } from "@mui/icons-material";
import { CollapsedListItem } from "../../components/common/CollapsedListItem/CollapsedListItem";

export default function MainPage() {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <CollapsedListItem text="Кандидаты" icon={<InboxIcon />}>
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon>
            <StarBorder />
          </ListItemIcon>
          <ListItemText primary="Вакансии" />
        </ListItemButton>
      </CollapsedListItem>
    </List>
  );
}
