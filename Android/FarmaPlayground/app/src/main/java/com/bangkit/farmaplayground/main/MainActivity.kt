package com.bangkit.farmaplayground.main

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.bangkit.farmaplayground.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btn.setOnClickListener {
            val id = binding.etId.text.toString()
        }

    }
}