"use client";

import AlertMessage from "@/components/shared/AlertMessage";
import { FormEvent, useState, useEffect } from "react";
import Spinner from "@/ui/Spinners/White";
import { useOverlayStore } from "@/zustand/admin/overlayStore";
import { ArrowLeftIcon, CloseIcon, EditIcon } from "@/icons";
import clsx from "clsx";
import Overlay from "@/ui/Overlay";
import { UpdateProductAction } from "@/actions/products";
import { AlertMessageType } from "@/lib/sharedTypes";

type DataType = {
  id: string;
  sourceInfo: {
    platform: string;
    platformUrl: string;
    store: string;
    storeId: string;
    storeUrl: string;
    productUrl: string;
  };
};

type FormDataType = {
  id: string;
  platform: string;
  platformUrl: string;
  store: string;
  storeId: string;
  storeUrl: string;
  productUrl: string;
};

export function ProductSourceButton() {
  const { showOverlay } = useOverlayStore();

  const { pageName, overlayName } = useOverlayStore((state) => ({
    pageName: state.pages.editProduct.name,
    overlayName: state.pages.editProduct.overlays.productSource.name,
  }));

  return (
    <button
      onClick={() => showOverlay({ pageName, overlayName })}
      type="button"
      className="w-9 h-9 rounded-full absolute top-2 right-2 flex items-center justify-center transition duration-300 ease-in-out active:bg-lightgray lg:hover:bg-lightgray"
    >
      <EditIcon size={20} />
    </button>
  );
}

export function ProductSourceOverlay({ data }: { data: DataType }) {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessageType, setAlertMessageType] = useState<AlertMessageType>(
    AlertMessageType.NEUTRAL
  );
  const [formData, setFormData] = useState<FormDataType>({
    id: data.id,
    platform: data.sourceInfo.platform,
    platformUrl: data.sourceInfo.platformUrl,
    store: data.sourceInfo.store,
    storeId: data.sourceInfo.storeId,
    storeUrl: data.sourceInfo.storeUrl,
    productUrl: data.sourceInfo.productUrl,
  });

  const { hideOverlay } = useOverlayStore();

  const { pageName, isOverlayVisible, overlayName } = useOverlayStore(
    (state) => ({
      pageName: state.pages.editProduct.name,
      overlayName: state.pages.editProduct.overlays.productSource.name,
      isOverlayVisible:
        state.pages.editProduct.overlays.productSource.isVisible,
    })
  );

  useEffect(() => {
    if (isOverlayVisible || showAlert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      if (!isOverlayVisible && !showAlert) {
        document.body.style.overflow = "visible";
      }
    };
  }, [isOverlayVisible, showAlert]);

  const onHideOverlay = () => {
    setLoading(false);
    hideOverlay({ pageName, overlayName });
  };

  const hideAlertMessage = () => {
    setShowAlert(false);
    setAlertMessage("");
    setAlertMessageType(AlertMessageType.NEUTRAL);
  };

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const updatedData = {
      id: data.id,
      sourceInfo: {
        platform: formData.platform,
        platformUrl: formData.platformUrl,
        store: formData.store,
        storeId: formData.storeId,
        storeUrl: formData.storeUrl,
        productUrl: formData.productUrl,
      },
    };

    try {
      const result = await UpdateProductAction(updatedData);
      setAlertMessageType(result.type);
      setAlertMessage(result.message);
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating product source:", error);
      setAlertMessageType(AlertMessageType.ERROR);
      setAlertMessage("Failed to update product source");
      setShowAlert(true);
    } finally {
      setLoading(false);
      onHideOverlay();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isOverlayVisible && (
        <Overlay>
          <div className="absolute bottom-0 left-0 right-0 w-full h-[calc(100%-60px)] rounded-t-3xl overflow-hidden bg-white md:w-[520px] md:rounded-2xl md:shadow md:h-max md:mx-auto md:mt-20 md:mb-[50vh] md:relative md:bottom-auto md:left-auto md:right-auto md:top-auto md:-translate-x-0">
            <form onSubmit={handleSave}>
              <div className="w-full h-[calc(100vh-188px)] md:h-auto">
                <div className="md:hidden flex items-end justify-center pt-4 pb-2 absolute top-0 left-0 right-0 bg-white">
                  <div className="relative flex justify-center items-center w-full h-7">
                    <h2 className="font-semibold text-lg">Product Source</h2>
                    <button
                      onClick={() => {
                        hideOverlay({ pageName, overlayName });
                        setFormData({
                          id: data.id,
                          platform: data.sourceInfo.platform,
                          platformUrl: data.sourceInfo.platformUrl,
                          store: data.sourceInfo.store,
                          storeId: data.sourceInfo.storeId,
                          storeUrl: data.sourceInfo.storeUrl,
                          productUrl: data.sourceInfo.productUrl,
                        });
                      }}
                      type="button"
                      className="w-7 h-7 rounded-full flex items-center justify-center absolute right-4 transition duration-300 ease-in-out bg-lightgray active:bg-lightgray-dimmed"
                    >
                      <CloseIcon size={18} />
                    </button>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center md:justify-between py-2 pr-4 pl-2">
                  <button
                    onClick={() => {
                      hideOverlay({ pageName, overlayName });
                      setFormData({
                        id: data.id,
                        platform: data.sourceInfo.platform,
                        platformUrl: data.sourceInfo.platformUrl,
                        store: data.sourceInfo.store,
                        storeId: data.sourceInfo.storeId,
                        storeUrl: data.sourceInfo.storeUrl,
                        productUrl: data.sourceInfo.productUrl,
                      });
                    }}
                    type="button"
                    className="h-9 px-3 rounded-full flex items-center gap-1 transition duration-300 ease-in-out active:bg-lightgray"
                  >
                    <ArrowLeftIcon className="fill-blue -ml-[2px]" size={20} />
                    <span className="font-semibold text-sm text-blue">
                      Product source
                    </span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={clsx(
                      "relative h-9 w-max px-4 rounded-full overflow-hidden transition duration-300 ease-in-out text-white bg-blue",
                      {
                        "bg-opacity-50": loading,
                        "active:bg-blue-dimmed": !loading,
                      }
                    )}
                  >
                    {loading ? (
                      <div className="flex gap-1 items-center justify-center w-full h-full">
                        <Spinner />
                        <span className="text-white">Saving</span>
                      </div>
                    ) : (
                      <span className="text-white">Save</span>
                    )}
                  </button>
                </div>
                <div className="w-full h-full mt-[52px] md:mt-0 p-5 pb-28 md:pb-10 flex flex-col gap-5 overflow-x-hidden overflow-y-visible invisible-scrollbar md:overflow-hidden">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="platform" className="font-semibold text-sm">
                      Platform
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="platform"
                        value={formData.platform}
                        onChange={handleInputChange}
                        placeholder="AliExpress"
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="platformUrl"
                      className="font-semibold text-sm"
                    >
                      Platform URL
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="platformUrl"
                        value={formData.platformUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.aliexpress.com/"
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="store" className="font-semibold text-sm">
                      Store
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="store"
                        value={formData.store}
                        onChange={handleInputChange}
                        placeholder="Women's Sleepwear Store"
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="storeId" className="font-semibold text-sm">
                      Store ID
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="storeId"
                        value={formData.storeId}
                        onChange={handleInputChange}
                        placeholder="3286105"
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="storeUrl" className="font-semibold text-sm">
                      Store URL
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="storeUrl"
                        value={formData.storeUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.aliexpress.com/store/4839201765"
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-blue"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="productUrl"
                      className="font-semibold text-sm"
                    >
                      Product URL
                    </label>
                    <div className="w-full h-9 relative">
                      <input
                        type="text"
                        name="productUrl"
                        value={formData.productUrl}
                        onChange={handleInputChange}
                        placeholder="https://www.aliexpress.com/item/7584936210472938.html"
                        className="w-full h-9 px-3 rounded-md transition duration-300 ease-in-out border focus:border-blue"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Overlay>
      )}
      {showAlert && (
        <AlertMessage
          message={alertMessage}
          hideAlertMessage={hideAlertMessage}
          type={alertMessageType}
        />
      )}
    </>
  );
}