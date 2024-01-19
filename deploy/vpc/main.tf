
module "notes-app-vpc" {
  source                 = "estib/sandbox/cloud//modules/vpc"
  profile                = "default"
  name                   = "notes-app"
  aws_region             = "us-west-2"
  aws_availability_zones = ["us-west-2a", "us-west-2b", "us-west-2c"]
  creator                = "YOUR_NAME"

  tags = {
  	Team    = "YOUR_TEAM"
    Project = "Notes App"
  }
}

provider "aws" {
  region  = "us-west-2"
  profile = "default"
}
