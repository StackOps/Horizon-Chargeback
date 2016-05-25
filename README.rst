=============================================
Horizon-Chargeback (OpenStack Dashboard)
=============================================


This repository is used to visualize the Stackops-Chargeback service in Horizon.

* Add import for the chargeback service in openstack_dashboard/api/__init__.py
       from openstack_dashboard.dashboards.chargeback.api import chargeback

       __all__ = [
	     "base",
	     "cinder",
	     "fwaas",
	     "glance",
	     "heat",
	     "keystone",
	     "lbaas",
	     "network",
	     "neutron",
	     "nova",
	     "swift",
	     "ceilometer",
	     "vpn",
	     "chargeback",
      ]

* Add import for the chargeback service in openstack_dashboard/api/rest/__init__.py

        from openstack_dashboard.dashboards.chargeback.api.rest import chargeback

* Add the file horizon/openstack_dashboard/enabled/_50_chargeback.py
  with the following content::

       DASHBOARD = 'stackops_chargeback'
       DISABLED = False
       ADD_INSTALLED_APPS = [
         'openstack_dashboard.dashboards.stackops_chargeback',
       ]
       ADD_ANGULAR_MODULES = ['horizon.dashboard.chargeback.mypanel'] #angular modules
* git clone this repo to horizon/openstack_dashboard/dashboards/chargeback

* from horizon directiony run ./run_tests.sh --runserver 0.0.0.0:8888

* connect to openstack http://localhost:8888
