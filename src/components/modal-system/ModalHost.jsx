import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";

import { closeModal } from "../../store/modal/modal.action";
import NodeEditDialog from "./modals/NodeEditDialog";
import RenamePopover from "./modals/RenamePopover";
import { selectModalType, selectModalProps } from "../../store/modal/modal.selector";
import { MODAL_TYPES } from "../../store/modal/modal.types";

const ModalHost = () => {
  const modalType = useSelector(selectModalType);
  const modalProps = useSelector(selectModalProps);
  const dispatch = useDispatch();

  if (!modalType) return null;

  const props = {
    ...modalProps,
    onClose: () => dispatch(closeModal()),
  };

  let renderedModal = null;

  switch (modalType) {
    case MODAL_TYPES.NODE_EDIT:
      renderedModal = <NodeEditDialog {...props} />;
      break;
    case MODAL_TYPES.RENAME_NODE:
      renderedModal = <RenamePopover {...props} />
      break;
    default:
      renderedModal = null;
  }

  return createPortal(
    renderedModal,
    document.getElementById("modal-root")
  );
};

export default ModalHost;