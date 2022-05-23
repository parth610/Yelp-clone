from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', zip_code=87507, profile_photo=None)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', zip_code=87507, profile_photo=None)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', zip_code=87507, profile_photo=None)
    matthew = User(
        username='matthew', email='matthew@aa.io', password='password', zip_code=87507, profile_photo=None)
    adam = User(
        username='adam', email='adam@aa.io', password='password', zip_code=87507, profile_photo=None)
    monty = User(
        username='monty', email='monty@aa.io', password='password', zip_code=87507, profile_photo=None)
    jenny = User(
        username='jenny', email='jenny@aa.io', password='password', zip_code=87507, profile_photo=None)
    debbie = User(
        username='debbie', email='debbie@aa.io', password='password', zip_code=87507, profile_photo=None)
    kate = User(
        username='kate', email='kate@aa.io', password='password', zip_code=87507, profile_photo=None)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(matthew)
    db.session.add(adam)
    db.session.add(monty)
    db.session.add(jenny)
    db.session.add(debbie)
    db.session.add(kate)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
