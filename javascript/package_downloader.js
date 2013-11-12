autowatch = 1;

if (max.os == "macintosh")
	os = "mac";
if (max.os == "windows")
	os = "win";
if (max.arch == "x86")
	arch = "32"
if (max.arch == "x64")
	arch = "64"

platform = os+arch;

mpd_global = new Global("mpd_global");
mpd_global.max_packages_master = new Dict("mpd_packages_master");
mpd_global.max_package_info = new Dict("mpd_package_info");

function populate()
{
	keys = mpd_global.max_packages_master .getkeys();
	keys.sort(function(a, b) {if (a.toLowerCase() < b.toLowerCase()) return -1; if (a.toLowerCase() > b.toLowerCase()) return 1; return 0;});
	outlet(0, "umenu clear");
	for (package in keys){
		if (mpd_global.max_packages_master.get(keys[package] + '::' + 'enabled') == "true"){
			outlet(0, "umenu append " + keys[package]);
		}
	}
	outlet(0, "umenu bang");
}

function package(package_name)
{
	var filetype = mpd_global.max_packages_master.get(package_name + '::' + 'link').split('.').pop();
	
	messnamed('mpd_package_name', package_name);
	
	if (filetype == "json")
		messnamed('mpd_link_json', mpd_global.max_packages_master.get(package_name + '::' + 'link'));
	if (filetype == "zip"){
		messnamed('mpd_link_zip', mpd_global.max_packages_master.get(package_name + '::' + 'link'));
		messnamed('mpd_description', "None");
	}
	
	messnamed('mpd_relative_path', mpd_global.max_packages_master.get(package_name + '::' + 'relative_path'));

}

function package_info()
{
	messnamed('mpd_description', mpd_global.max_package_info.get("description"));
	messnamed('mpd_link_zip', mpd_global.max_package_info.get("link_" + platform));
}