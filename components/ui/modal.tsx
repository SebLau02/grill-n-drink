import React from "react";
import { Modal, ModalProps, Pressable, ViewProps } from "react-native";
import Paper, { PaperProps } from "./paper";

interface Props extends ModalProps {
  open: boolean;
  onClose: () => void;
  bodyProps?: PaperProps;
  backdropProps?: ViewProps;
}
function CustomModal({
  open,
  onClose,
  children,
  bodyProps,
  backdropProps,
  ...props
}: Props) {
  return (
    <Modal
      {...props}
      visible={open}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onClose()}
    >
      <Pressable
        {...backdropProps}
        onPress={() => onClose()}
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          backdropProps?.style,
        ]}
      >
        <Pressable onPress={() => {}} style={[[bodyProps?.style]]}>
          <Paper
            {...bodyProps}
            variant="outlined"
            style={[
              {
                padding: 16,
                width: "100%",
                height: "100%",
              },
            ]}
          >
            {children}
          </Paper>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default CustomModal;
