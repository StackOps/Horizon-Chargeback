# The name of the dashboard to be added to HORIZON['dashboards']. Required.
DASHBOARD = 'chargeback'

# If set to True, this dashboard will not be added to the settings.
DISABLED = False

# A list of applications to be added to INSTALLED_APPS.
ADD_INSTALLED_APPS = ['chargeback_dashboard']

ADD_ANGULAR_MODULES = ['horizon.dashboard.chargeback',
'horizon.dashboard.chargeback.billingcycles',
'horizon.dashboard.chargeback.payments']

ADD_JS_FILES = [
    'dashboard/chargeback/billingcycles/billingcycles.module.js',
    'dashboard/chargeback/billingcycles/billingcycles.controller.js',
    'dashboard/chargeback/payments/payments.module.js',
    'dashboard/chargeback/payments/payments.controller.js',

    'dashboard/chargeback/services/roles.service.js',
    'dashboard/chargeback/services/chargeback.service.js',

    'dashboard/widgets/cycle.directive.js',
    'dashboard/widgets/project.directive.js',
    'dashboard/widgets/product.directive.js',
    'dashboard/widgets/productResource.directive.js',
    'dashboard/widgets/statusMessage.directive.js',
    'dashboard/widgets/cbkCloudUsage.directive.js',
    'dashboard/widgets/cbkBalance.directive.js',
]

ADD_SCSS_FILES = [
    'static/dashboard/css/chargeback.css'
]

AUTO_DISCOVER_STATIC_FILES = True
