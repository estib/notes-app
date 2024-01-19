module "notes-app" {
  source        = "estib/sandbox/cloud//modules/ec2"
  test_env_name = "notes-app"
  creator       = "YOUR_NAME"
  profile       = "default"
  aws_region    = "us-west-2"
  instance_cnt  = var.instance_cnt
  access_ips    = ["YOUR_IP_V4/32"]  # add multiple ips if you wish. 
  vpc_id        = data.terraform_remote_state.vpc.outputs.notes-app-vpc.id
  subnet_id     = data.terraform_remote_state.vpc.outputs.notes-app-vpc-subnets.0.id

  extra_ingress_rules = {
    "vita": {
      "port": "5173"
    },
    "sqlite": {
      "port": "3000"
    }
  }
}

provider "aws" {
  region  = "us-west-2"
  profile = "default"
}


data "terraform_remote_state" "vpc" {
  backend = "local"
  config = {
    path = "../vpc/terraform.tfstate"
  }
}
