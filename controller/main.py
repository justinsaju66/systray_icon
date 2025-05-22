# -- coding: utf-8 --
import requests
from odoo import http
import qrcode
import base64
from io import BytesIO


class QRGenerator(http.Controller):
    def generate_qr_base64(self, data):
        qr = qrcode.make(data)
        buffer = BytesIO()
        qr.save(buffer, format='PNG')
        qr_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        return f"data:image/png;base64,{qr_base64}"

    @http.route('/generate-qr-code', type='json', auth='user')
    def qr_generator(self, text):
        qr_img = self.generate_qr_base64(text)
        print(qr_img)
        return {'qr_code': qr_img}