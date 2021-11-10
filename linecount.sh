count=$(find ./src -name "*.ts" -type f -exec cat {} + | wc -l | bc)

if [ "$count" -gt 250 ];
then
  echo "Line count ($count) exceeded max ($max) :: FAILED";
  exit 1;
else
  echo "line count ($count) :: PASSED";
  exit 0;
fi
