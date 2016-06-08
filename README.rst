=============================================
Horizon-Chargeback (OpenStack Dashboard)
=============================================


This repository is used to visualize the Stackops-Chargeback service in Horizon.

* git clone this repo to horizon/openstack_dashboard/dashboards/chargeback

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
        from openstack_dashboard.dashboards.chargeback.api.rest import roles

* Add the file enabled/_50_chargeback.py to horizon/openstack_dashboard/enabled/_50_chargeback.py


* from horizon directiony run ./run_tests.sh --runserver 0.0.0.0:8888

* connect to openstack http://localhost:8888
