echo 'What is your project name? This should match the profile you added into .aws/credentials'
read answer

# create terraform.sh custom file
echo "#!/usr/bin/env bash
aws-vault --prompt=terminal exec ${answer} -- /usr/local/bin/terraform \$@" > terraform.sh

# create init.sh custom file
echo "#!/usr/bin/env bash
aws-vault --prompt=terminal exec ${answer} -- /usr/local/bin/terraform init  > >(tee -a .temp) 2> >(tee -a .temp >&2)

if grep -q 'Error: NoSuchBucket' '.temp';
then
  rm .temp
  echo 'Terraform State bucket does not exist'
  read -p 'Whould you like to create one? (Y/N): ' confirm
  if [ \"\$confirm\" == \"\${confirm#[Yy]}\" ];
  then
    exit 1
  else
    input='state.tf'
    while IFS= read -r line
    do
      if [[ \"\$line\" == *\"bucket\"* ]]; then
        bucket=\${line#*\\\"*}
        bucket=\${bucket%\\\"*}
      fi
    done < \"\$input\"
    echo 'Creating bucket...'
    aws-vault --prompt=terminal exec ${answer} -- aws s3api create-bucket --bucket \${bucket} --region us-east-2 --create-bucket-configuration LocationConstraint=us-east-2
    echo 'Bucket successfully created'
    ./\$(basename \$0) && exit
  fi
else
  rm .temp
  echo 'Terraform successfully initialized'
fi" > init.sh

echo 'init.sh and terraform.sh are now ready to be used'

# delete this file
rm $0

