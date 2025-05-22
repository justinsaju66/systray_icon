# -*- coding: utf-8 -*-


{
    'name': "Systray icon",
    'version': '1.0',
    'depends': ['base'],
    'author': "Author Name",
    'category': 'all',
    'description': """
    Systray icon
    """,
    # data files always loaded at installation
    # 'data': [
    #        'views/delivery_button_view.xml',
    # ],
    'assets': {
       'web.assets_backend': [
           'systray_icon/static/src/js/systray_icon.js',
           'systray_icon/static/src/xml/systray_icon.xml',
       ],
    },


    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
