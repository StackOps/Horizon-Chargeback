=============================================
Horizon-Chargeback (OpenStack Dashboard)
=============================================


This repository is used to visualize the Stackops-Chargeback service in Horizon.

* git clone this repo to horizon/openstack_dashboard/dashboards/chargeback

* Run: cd Horizon-Chargeback & python setup.py sdist

* Run: cp -rv enabled/_50_chargeback.py horizon/openstack_dashboard/local/enabled/_50_chargeback.py

* Run: horizon/tools/with_venv.sh pip install ~/Horizon-Chargeback/dist/chargeback-dashboard-<last-version>.tar.gz

* from horizon directiony run ./run_tests.sh --runserver 0.0.0.0:8888

* connect to openstack http://localhost:8888
