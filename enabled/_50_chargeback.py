# The name of the dashboard to be added to HORIZON['dashboards']. Required.
DASHBOARD = 'chargeback'

# If set to True, this dashboard will not be added to the settings.
DISABLED = False

# A list of applications to be added to INSTALLED_APPS.
ADD_INSTALLED_APPS = [
    'openstack_dashboard.dashboards.chargeback',
]

ADD_ANGULAR_MODULES = ['horizon.dashboard.chargeback.mypanel']

ADD_JS_FILES = [
    'dashboard/chargeback/mypanel/mypanel.module.js',
    'dashboard/chargeback/mypanel/account.service.js',
    'dashboard/widgets/cycles.directive.js',
]

AUTO_DISCOVER_STATIC_FILES = True
