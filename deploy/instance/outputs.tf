
output "entrypoint" {
  value = module.notes-app.entrypoint
}

output "app_link" {
  value = format("%s:5173", module.notes-app.instance_info.public_ip)
}
