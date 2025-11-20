# TODO: Fix Hero Image URL Loading Issue

## Completed Tasks
- [x] Fixed save_hero.php to handle FormData POST correctly (changed from stdin to $_POST)
- [x] Updated image handling in save_hero.php to use $_POST['image'] instead of file upload
- [x] Added console.log in hero.html JS to debug loaded data
- [x] Added error_log in load_hero.php to debug server-side data

## Next Steps
- [ ] Test the hero.html page in browser and check console for loaded data
- [ ] Check php error logs for load_hero.php output
- [ ] If image still empty, check database directly via phpMyAdmin for hero table image column
- [ ] If DB has data, ensure column name is 'image' (case-sensitive)
- [ ] Remove debugging logs after fix
