import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { evalCondition, extractLinks } from "./story-player.utils";
import { useSelector } from "react-redux";
import { selectAllNodes, selectSelectedNodeId } from "../../store/visual-editor/visual-editor.selector";

const StoryRenderer = () => {
  const nodes = useSelector(selectAllNodes);
  console.log("nodes", nodes)
  const startNodeId = useSelector(selectSelectedNodeId);
  console.log("starNodeId", startNodeId);
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [flags, setFlags] = useState({});

  const currentNode = nodes.find((n) => n.id === currentNodeId);

  useEffect(() => {
    if (!currentNode || !currentNode.flagsSet) return;
    setFlags((prev) => {
      const updated = { ...prev };
      currentNode.flagsSet.forEach(({ variable, operation, value }) => {
        if (operation === "set") updated[variable] = value;
        if (operation === "+")
          updated[variable] = (updated[variable] || 0) + value;
        if (operation === "-")
          updated[variable] = (updated[variable] || 0) - value;
      });
      return updated;
    });
  }, [currentNodeId]);

  if (!currentNode) {
    return <Typography>Node not found</Typography>;
  }

  const renderDescription = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(currentNode.description, "text/html");
    const body = doc.body;

    const evaluateConditionsRecursively = (element) => {
      const children = Array.from(element.children);
      for (let child of children) {
        const condAttr = child.getAttribute("data-cond");
        if (condAttr) {
          try {
            const condition = JSON.parse(condAttr);
            if (!evalCondition(condition, flags)) {
              child.remove();
              continue;
            }
          } catch (e) {
            console.warn("Invalid data-cond:", condAttr);
          }
        }
        evaluateConditionsRecursively(child);
      }
    };

    evaluateConditionsRecursively(body);

    return (
      <Typography
        sx={{ mb: 2 }}
        dangerouslySetInnerHTML={{
          __html: body.innerHTML.replace(/\[\[[^\]]+\]\]/g, ""),
        }}
      />
    );
  };

  const handleLinkClick = (targetTitle) => {
    const targetNode = nodes.find((n) => n.title === targetTitle);
    if (targetNode) {
      setCurrentNodeId(targetNode.id);
    } else {
      alert(`Node with title "${targetTitle}" not found.`);
    }
  };

  const links = extractLinks(currentNode.description);

  return (
    <Box sx={{ p: 4 }}>
      {renderDescription()}
      <Box sx={{ mt: 2 }}>
        {links.map(({ displayText, targetTitle }) => (
          <Button
            key={targetTitle}
            variant="contained"
            sx={{ mr: 1, mb: 1 }}
            onClick={() => handleLinkClick(targetTitle)}
          >
            {displayText}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default StoryRenderer;
