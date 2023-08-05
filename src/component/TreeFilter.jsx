import React from "react";
import TextField from "@material-ui/core/TextField";
import { uniq } from "lodash";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { withStyles } from "@material-ui/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  filterTree,
  expandFilteredNodes,
  getIDsExpandFilter,
} from "../util/filterTreeUtil";

const TreeFilter = (props) => {
  const { data } = props;
  const [expanded, setExpanded] = React.useState(["0", "1", "3"]);
  const [selected, setSelected] = React.useState([]);
  const [selectedSingleItem, setSelectedSingleItem] = React.useState("");

  const onFilterKeyUp = (e) => {
    const value = e.target.value;
    const filter = value.trim();

    if (!filter) {
      setExpanded(["root"]);
      return;
    }
  };

  const handleToggle = (event, nodeIds) => {
    let expandedTemp = expanded;
    expandedTemp = nodeIds;
    setExpanded(expandedTemp);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };

  const getSearchedId = (ids, nodes) => {
    if (nodes.name.includes("8")) {
      ids = [...ids, nodes.id];
    }

    if (nodes.children && nodes.children.length > 0) {
      // return [
      //   ...ids,
      //   ...nodes.children.map((node) => getSearchedId(ids, node)),
      // ];

      for (let index = 0; index < nodes.children.length; index++) {
        ids = getSearchedId(ids, nodes.children[index]);
      }
    }

    return ids;
  };

  console.log("data", data);
  // debugger;
  const ids = getSearchedId([], data);
  console.log("ids", ids);

  const renderTree = (nodes) => {
    if (!nodes || nodes.length === 0) {
      return null;
    }

    return (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children)
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  return (
    <div>
      <TextField label="Filter ..." onKeyUp={onFilterKeyUp} />

      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
};

export default TreeFilter;
