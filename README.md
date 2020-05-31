## Yutingli-dynamodb-exec
#### scripts
- [x] create table `auto/1-create-table`
- [x] add memberName and startDate attributes `auto/2-add-attributes`
- [x] write 10 item into table `auto/3-batch-write-items`
- [x] update item `auto/4-update-item`
- [x] get item by primary key(partition key and sort key) `auto/5-get-item-by-pk`
- [x] query `auto/6-query`
- [x] scan `auto/7-scan`
- [x] create memberName-index as secondary index `auto/8-create-secondary-index`
- [x] query by secondary index `auto/9-query-by-secondary-index`
- [x] create backup `auto/10-create-backup`
- [x] restore table from backup `auto/11-restore-from-backup`
- [x] enable point in time recovery `auto/12-enable-point-in-time-recovery`
- [x] restore table from time point `auto/13-restore-point-in-time`
- [x] clean up all table `auto/14-clean-up`
 
#### CRUD
- [x] query all yuting's items
```bash
curl -i http://localhost:3000/projects
```
- [x] create a item
```bash
curl -X POST http://localhost:3000/projects \
     -d '{"projectName":"test for api", "projectType":"small", "memberName":"yuting"}' \
     -H "Content-Type: application/json"
```
- [x] find a item
```bash
curl -i http://localhost:3000/projects/test%20for%20api/small 
```
- [x] update a item
```bash
curl -X PUT http://localhost:3000/projects/test%20for%20api/small \
     -d '{"memberName":"yuting"}' \
     -H "Content-Type: application/json"
```
- [x] delete a item
```bash
curl -X DELETE http://localhost:3000/projects/test%20for%20api/small
```
