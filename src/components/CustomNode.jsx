import { Card, CardContent, Typography, Box } from "@mui/material";
import { Handle, Position } from "@xyflow/react";
import { useTheme } from "@emotion/react";
import { getTruncatedDescription } from "./visual-editor.utils";

const CustomNode = ({ data, selected }) => {
  const {
    palette: { secondary, info, primary },
  } = useTheme();
  
  return (
    <Box sx={{ position: "relative", width: 150 }}>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: info.main }}
      />
      <Card
        elevation={selected ? 6 : 2}
        sx={{
          borderRadius: 2,
          padding: 0.5,
          backgroundColor: selected ? primary.main : primary.light,
          border: `2px solid ${selected ? info.main : info.dark}`,
          cursor: "pointer",
          transition: "box-shadow 0.2s ease-in-out",
          boxShadow: selected
              ? `0 0 10px 3px ${info.main}`
              : "0px 1px 3px rgba(0,0,0,0.2)",
          "&:hover": {
            boxShadow: selected
              ? `0 0 6px 3px ${info.dark}`
              : `0 0 10px 2px ${secondary.main}`,
          },
        }}
      >
        <CardContent sx={{ padding: "8px !important" }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: "12px",
              mb: 1,
              color: secondary.contrastText,
            }}
          >
            {data.title || "Untitled"}
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: "10px" }}>
            {getTruncatedDescription(data.description) || "No content yet."}
          </Typography>
        </CardContent>
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: info.main }}
      />
    </Box>
  );
};

export default CustomNode;
