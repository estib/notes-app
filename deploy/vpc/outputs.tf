output "notes-app-vpc" {
	value = module.notes-app-vpc.vpc
}

output "notes-app-vpc-subnets" {
	value = module.notes-app-vpc.subnets
}

output "notes-app-vpc-security-group" {
	value = module.notes-app-vpc.security_group
}