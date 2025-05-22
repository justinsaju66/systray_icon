
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { Dialog } from "@web/core/dialog/dialog";
import { markup } from "@odoo/owl";
import { rpc } from "@web/core/network/rpc";

class SystrayIcon extends Component {
    setup() {
        super.setup();
        this.notification = useService("notification");
        this.dialogService = useService("dialog");
    }

    showPopup() {
        this.dialogService.add(ConfirmationDialog, {
            title: _t("QR Code"),
            body: markup(`
                <input type="text" class="form-control" id="qrInput" placeholder="${_t('Enter text for QR code')}">`),
            confirmClass: "btn-primary",
            confirmLabel: _t("Generate"),
            confirm: async () => {
                console.log(document.getElementById('qrInput').value)
                const qrInputValue = document.getElementById('qrInput').value.trim();

                if (!qrInputValue) {
                    this.notification.add(_t("Please enter text to generate the QR code."), {
                        type: "warning",
                    });
                    return;
                }
                this.notification.add(_t("QR code Generated Successfully"), {
                    type: "success",
                });
                this.qrCodeUrl = await rpc('/generate-qr-code', {text:document.getElementById('qrInput').value})
                console.log(this.qrCodeUrl)
                const qr_code = this.qrCodeUrl.qr_code;
                this.dialogService.add(ConfirmationDialog, {
                    title: _t("QR Code"),
                    body: markup(`
                        <img src="${qr_code}" alt="QR Code" style="max-width: 100%;"/>`),
                });
            },
            cancelLabel: _t("Reset"),
            cancel: () => {
                const inputField = document.getElementById('qrInput');
                if (inputField) {
                    inputField.value = '';
                }
            },
            closeDialog: false,

        });
    }
}

SystrayIcon.template = "systray_icon";
export const systrayItem = {
    Component: SystrayIcon,
};
registry.category("systray").add("SystrayIcon", systrayItem, { sequence: 1 });