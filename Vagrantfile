# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"

  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "private_network", ip: "192.168.50.4"
  config.vm.hostname = "camelearn.dev"
  #config.hostsupdater.aliases = ["camelearn"]

  config.vm.provision "shell", path: ".vagrant-conf/bootstrap.sh"

  config.vm.synced_folder ".", "/var/www/", owner: 'www-data', group: 'www-data'

  config.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--memory", "1024"]
  end
end
