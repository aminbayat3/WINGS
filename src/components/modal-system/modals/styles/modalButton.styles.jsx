import { styled } from "@mui/material/styles";

import { Button } from "@mui/material";

export const ModalButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.dark,
  color: theme.palette.getContrastText(theme.palette.info.dark),
  "&:hover": {
    backgroundColor: theme.palette.info.main,
  },
}));
