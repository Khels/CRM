import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { StarBorder } from "@mui/icons-material";
import { CollapsedListItem } from "../../components/common/CollapsedListItem/CollapsedListItem";
import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../constants";

interface IMainLayoutProps {}

export const MainLayout: FC<IMainLayoutProps> = ({}) => {
  const navigate = useNavigate();

  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid item>
          <Paper sx={{ height: "100%", pr: 1 }}>
            <List
              sx={{ width: 240, bgcolor: "background.paper" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <CollapsedListItem
                isOpenByDefault={true}
                text="Кандидаты"
                icon={<InboxIcon />}
              >
                <ListItem selected={true}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => navigate(PATH.VACANCIES)}
                  >
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Вакансии" />
                  </ListItemButton>
                </ListItem>
              </CollapsedListItem>
            </List>
          </Paper>
        </Grid>
        <Grid sx={{ height: "100%" }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};
