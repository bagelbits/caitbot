require "test_helper"

class Api::SequencesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @trampoline = Apparatus.create!(name: "Trampoline")
    @bars = Apparatus.create!(name: "Bars")
    @twist = TrickType.create!(name: "Twist")
    @flip = TrickType.create!(name: "Flip")

    @barani = Trick.create!(name: "Barani", description: "d", trick_type: @twist, apparatuses: [ @trampoline ])
    @full_twist = Trick.create!(name: "Full Twist", description: "d", trick_type: @twist, apparatuses: [ @trampoline ])
    @front_tuck = Trick.create!(name: "Front Tuck", description: "d", trick_type: @flip, apparatuses: [ @trampoline, @bars ])
    @bars_only_flip = Trick.create!(name: "Bars Only Flip", description: "d", trick_type: @flip, apparatuses: [ @bars ])
  end

  test "returns one trick per requested trick type, valid for the given apparatus" do
    20.times do
      get "/api/generate_sequence", params: { apparatus_id: @trampoline.id, sequence_ids: "#{@twist.id},#{@flip.id}" }
      assert_response :success

      sequence = JSON.parse(response.body)["sequence"]
      assert_equal 2, sequence.length
      assert_includes [ "Barani", "Full Twist" ], sequence[0]["name"]
      assert_equal "Front Tuck", sequence[1]["name"]
    end
  end

  test "returns an empty object when no sequence_ids are given" do
    get "/api/generate_sequence", params: { apparatus_id: @trampoline.id }

    assert_response :success
    assert_equal({}, JSON.parse(response.body))
  end
end
