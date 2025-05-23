/** @odoo-module **/
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component, useState } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { Dialog } from "@web/core/dialog/dialog";
import { markup } from "@odoo/owl";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";
import { rpc } from "@web/core/network/rpc";

class SystrayIcon extends Component {
    setup() {
        this.notification = useService("notification");
        this.state = useState({
            qr_code: "",
        });
    }

    async generateQRCode() {
        event.stopPropagation();
        const qrInputText = document.getElementById('qrInput').value.trim();
         if (!qrInputText) {
                    this.notification.add(_t("Please enter text to generate QR code"), {
                        type: "warning",
                    });
                    return false;
                }
        const response = await rpc('/generate-qr-code', { text: qrInputText });
        this.state.qr_code = response.qr_code;
        const button = document.getElementById('downloadQRCode')
        if (response){
            async downloadFunction = downloadQRCode() {
                const link = document.createElement('a');
                link.href = qr_code;
                link.download = 'qr_code.png';
                link.click();
                }
        else {
            button.style.display = 'none';
          }
        }
    }
    async resetQRCode() {
        event.stopPropagation();
        const inputField = document.getElementById('qrInput');
        const qrImage = document.getElementById('qr_image');
        if (inputField) {
            inputField.value = '';
            qrImage.src = '';
        }
        return false;
    }


}

SystrayIcon.components = { Dropdown, DropdownItem };
SystrayIcon.template = "systray_icon";
export const systrayItem = {
    Component: SystrayIcon,
};
registry.category("systray").add("SystrayIcon", systrayItem, { sequence: 1 });

//import { registry } from "@web/core/registry";
//import { useService } from "@web/core/utils/hooks";
//import { Component } from "@odoo/owl";
//import { _t } from "@web/core/l10n/translation";
//import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
//import { Dialog } from "@web/core/dialog/dialog";
//import { markup } from "@odoo/owl";
//import { rpc } from "@web/core/network/rpc";
//
//class SystrayIcon extends Component {
//    setup() {
//        super.setup();
//        this.notification = useService("notification");
//        this.dialogService = useService("dialog");
//    }
//
//    showPopup() {
//        this.dialogService.add(ConfirmationDialog, {
//            title: _t("QR Code"),
//            body: markup(`
//                <input type="text" class="form-control" id="qrInput" placeholder="${_t('Enter text for QR code')}">`),
//            confirmClass: "btn-primary",
//            confirmLabel: _t("Generate"),
//            confirm: async () => {
//                console.log(document.getElementById('qrInput').value)
//                const qrInputText = document.getElementById('qrInput').value.trim();
//
//                if (!qrInputText) {
//                    this.notification.add(_t("Please enter text to generate QR code"), {
//                        type: "warning",
//                    });
//                    return false;
//                }
//                this.notification.add(_t("QR code Generated Successfully"), {
//                    type: "success",
//                });
//                this.qrCodeUrl = await rpc('/generate-qr-code', {text:document.getElementById('qrInput').value})
//                console.log(this.qrCodeUrl)
//                const qr_code = this.qrCodeUrl.qr_code;
//                this.dialogService.add(ConfirmationDialog, {
//                    title: _t("QR Code"),
//                    body: markup(`
//                        <img src="${qr_code}" alt="QR Code" style="max-width: 100%;"/>`),
//                    confirmClass: "btn-primary",
//                    confirmLabel: _t("Download"),
//                    confirm: async () => {
//                    const link = document.createElement('a');
//                    link.href = qr_code;
//                    link.download = 'qr_code.png';
//                    link.click();
//                    },
//                    cancelLabel : _t("Cancel"),
//                    cancel: () => { },
//                });
//            },
//            cancelLabel: _t("Reset"),
//            cancel: () => {
//                const inputField = document.getElementById('qrInput');
//                if (inputField) {
//                    inputField.value = '';
//                }
//                return false;
//            },
//        });
//
//    }
//}
//
//SystrayIcon.template = "systray_icon";
//export const systrayItem = {
//    Component: SystrayIcon,
//};
//registry.category("systray").add("SystrayIcon", systrayItem, { sequence: 1 });
