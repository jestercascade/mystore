"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, CloseIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import { AlertMessageType } from "@/lib/sharedTypes";
import { TextEditor } from "@/components/shared/TextEditor";

type DataType = {
  id: string;
  description: string | null;
};

export function DescriptionButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editProduct.name,
    overlayName: state.pages.editProduct.overlays.description.name,
  }));

  return (
    <button
      onClick={() => showOverlay({ pageName, overlayName })}
      type="button"
      className="w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray lg:hover:bg-lightgray"
    >
      <EditIcon size={20} />
    </button>
  );
}

export function DescriptionOverlay() {
  // const [description, setDescription] = useState<string>(
  //   data.description || ""
  // );
  const [loading, setLoading] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessageType, setAlertMessageType] = useState<AlertMessageType>(
    AlertMessageType.NEUTRAL
  );

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editProduct.name,
      overlayName: state.pages.editProduct.overlays.description.name,
      isOverlayVisible: state.pages.editProduct.overlays.description.isVisible,
    })
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const hideAlertMessage = () => {
    setShowAlert(false);
    setAlertMessage("");
    setAlertMessageType(AlertMessageType.NEUTRAL);
  };

  const onHideOverlay = () => {
    setLoading(false);
    hideOverlay({ pageName, overlayName });
  };

  const [description, setDescription] = useState<string>("");

  const handleSave = async () => {
    console.log(description);
  };

  return (
    <>
      <Overlay>
        <div className="w-[720px] h-[1200px] mx-auto my-14 rounded-xl p-5 bg-white">
          <button
            onClick={handleSave}
            type="button"
            disabled={loading}
            className={clsx(
              "relative h-9 w-max px-4 mb-5 rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-blue active:bg-blue-dimmed"
            )}
          >
            <span className="text-white">Save</span>
          </button>
          <TextEditor
            placeholder="Select Post"
            name="post"
            value={""}
            onChange={(newValue: string) => setDescription(newValue)}
          />
        </div>
      </Overlay>
    </>
  );
}
