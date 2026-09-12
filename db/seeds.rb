trampoline = Apparatus.create!(name: "Trampoline")
bars = Apparatus.create!(name: "Bars")

twist = TrickType.create!(name: "Twist")
flip = TrickType.create!(name: "Flip")

barani = Trick.create!(name: "Barani", description: "Front flip with a half twist.", trick_type: twist)
full_twist = Trick.create!(name: "Full Twist", description: "A single somersault with a full twist.", trick_type: twist)
front_tuck = Trick.create!(name: "Front Tuck", description: "A forward somersault in a tucked position.", trick_type: flip)
back_tuck = Trick.create!(name: "Back Tuck", description: "A backward somersault in a tucked position.", trick_type: flip)

barani.apparatuses << trampoline
full_twist.apparatuses << trampoline
front_tuck.apparatuses << [trampoline, bars]
back_tuck.apparatuses << [trampoline, bars]
