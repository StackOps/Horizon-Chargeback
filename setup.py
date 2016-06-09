from setuptools import setup, find_packages

setup(
    name = 'chargeback',
    version = '0.0.1',
    description = 'sample dashboard extension for OpenStack Dashboard',
    author = 'Lissete Moscoso',
    author_email = 'lissete.moscoso@stackops.com',
    classifiers = [
        'Environment :: OpenStack',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Intended Audience :: System Administrators',
        'License :: OSI Approved :: Apache Software License',
        'Operating System :: OS Independent',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Topic :: Internet :: WWW/HTTP',
    ],
    packages=find_packages(),
    include_package_data = True,
)
